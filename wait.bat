@echo off


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
