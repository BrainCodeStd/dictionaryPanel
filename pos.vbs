Set wshShell = CreateObject("WScript.Shell")
Return = WshShell.Run("cmd.exe /F pm2 start ./server.js",0,true)