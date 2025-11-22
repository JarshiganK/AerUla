param(
    [string] $DbName = 'aerula',
    [string] $DbHost = 'localhost',
    [int]    $DbPort = 5432,
    [string] $DbUser = 'postgres',
    [string] $DbPassword = 'Jarshi17225',
    [int]    $Port = 3000,
    [switch] $SkipDb,
    [switch] $SkipInstall
)

$ErrorActionPreference = 'Stop'
$env:PGPASSWORD = $DbPassword

function Write-Header($Message, $Color = 'Cyan') {
    Write-Host ""
    Write-Host ("=" * 72) -ForegroundColor $Color
    Write-Host " $Message" -ForegroundColor $Color
    Write-Host ("=" * 72) -ForegroundColor $Color
}

function Write-Step($Message, $Color = 'Yellow') {
    Write-Host ""
    Write-Host "> $Message" -ForegroundColor $Color
}

function Write-Success($Message) {
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-WarningMessage($Message) {
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-ErrorMessage($Message) {
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Ensure-Command($CommandName) {
    if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
        throw "$CommandName is not available on PATH. Please install it first."
    }
}

function Invoke-Psql([string] $Database, [string] $Command) {
    psql -h $DbHost -p $DbPort -U $DbUser -d $Database -c $Command 2>&1 | Out-Null
}

$Root = $PSScriptRoot
$SchemaFile = Join-Path $Root 'scripts\schema.sql'
$EnvFile = Join-Path $Root '.env'

Write-Header " Local Development"
Write-Host "Database : $DbHost`:$DbPort/$DbName" -ForegroundColor Gray
Write-Host "App      : http://localhost:$Port" -ForegroundColor Gray

# Preflight
Ensure-Command 'psql'
Ensure-Command 'npm'
Ensure-Command 'node'

# Database Setup
if (-not $SkipDb) {
    Write-Header "Step 1: Database Setup"
  
    # Check Postgres connectivity
    try {
        Invoke-Psql -Database 'postgres' -Command "SELECT 1;"
        Write-Success "PostgreSQL reachable"
    }
    catch {
        Write-ErrorMessage "Cannot connect to PostgreSQL. Check credentials and if service is running."
        exit 1
    }

    # Create DB
    $dbExists = psql -h $DbHost -p $DbPort -U $DbUser -d postgres -t -c "SELECT 1 FROM pg_database WHERE datname='$DbName'" 2>$null
    if (-not $dbExists.Trim()) {
        try {
            Invoke-Psql -Database 'postgres' -Command "CREATE DATABASE `"$DbName`" ;"
            Write-Success "Database '$DbName' created"
        }
        catch {
            Write-ErrorMessage "Failed to create database. Error: $_"
            exit 1
        }
    }
    else {
        Write-Success "Database '$DbName' already exists"
    }

    # Apply Schema
    if (Test-Path $SchemaFile) {
        Write-Step "Applying schema..."
        $psqlProcess = Start-Process psql -ArgumentList "-h $DbHost -p $DbPort -U $DbUser -d $DbName -f `"$SchemaFile`"" -PassThru -NoNewWindow -Wait
        if ($psqlProcess.ExitCode -eq 0) {
            Write-Success "Schema applied"
        }
        else {
            Write-WarningMessage "Schema application finished with exit code $($psqlProcess.ExitCode). Check output for details."
            # Don't exit here, as it might just be harmless notices that caused a non-zero exit in some configs, or we want to try running anyway.
        }
    }
}

# Env Setup
Write-Header "Step 2: Environment Configuration"
$DbUrl = "postgresql://$($DbUser):$($DbPassword)@$($DbHost):$($DbPort)/$($DbName)"

if (Test-Path $EnvFile) {
    $currentEnv = Get-Content $EnvFile -Raw
    if ($currentEnv -notmatch "DATABASE_URL") {
        Add-Content -Path $EnvFile -Value "`nDATABASE_URL=$DbUrl"
        Write-Success "Added DATABASE_URL to .env"
    }
    else {
        Write-Success ".env file exists"
    }
}
else {
    Set-Content -Path $EnvFile -Value "DATABASE_URL=$DbUrl"
    Write-Success "Created .env file"
}

# App Start
Write-Header "Step 3: Starting Application"
if (-not $SkipInstall) {
    Write-Step "Installing dependencies..."
    npm install | Out-Null
}

Write-Step "Starting Next.js dev server in new window..."
$appCommand = "npm run dev"
$appProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$Root`"; $appCommand" -PassThru

Write-Header "Running"
Write-Host "Press ENTER to stop server and DROP database (Cleanup)." -ForegroundColor Yellow
Write-Host "Press CTRL+C to stop server and KEEP database." -ForegroundColor Yellow

try {
    $null = Read-Host
  
    # Cleanup (Enter pressed)
    Write-Header "Shutting Down" 'Magenta'
  
    if ($appProcess -and -not $appProcess.HasExited) {
        Stop-Process -Id $appProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Success "Stopped app process"
    }

    Write-Step "Dropping database..."
    # Terminate connections first
    psql -h $DbHost -p $DbPort -U $DbUser -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='$DbName' AND pid <> pg_backend_pid();" 2>$null | Out-Null
    Invoke-Psql -Database 'postgres' -Command "DROP DATABASE IF EXISTS `"$DbName`";"
    Write-Success "Database dropped."

}
catch {
    # Ctrl+C or other interrupt
    Write-Host "`nInterrupted. Keeping database." -ForegroundColor Yellow
    if ($appProcess -and -not $appProcess.HasExited) {
        Stop-Process -Id $appProcess.Id -Force -ErrorAction SilentlyContinue
    }
}
