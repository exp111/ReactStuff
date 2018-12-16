@echo off
set /p project="Enter Project Name: "
npx create-react-app %project%
cd %project%
npm start
pause