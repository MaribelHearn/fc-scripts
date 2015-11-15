@echo off

:: This Batch script waits for <argument> seconds. Does nothing when no argument is given.
:: Used by the /restart command, and as such, said command only works on Windows.

if "%1"=="" (
	goto :eof
)
for /l %%i in (1, 1, %1) do (
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
	ping localhost -n 1 >nul
)
goto :eof
