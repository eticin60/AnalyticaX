#!/bin/bash

echo "===================================="
echo "  AnalyticaX - Starting Server"
echo "===================================="
echo ""

cd backend

echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

node --version

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Starting server..."
echo "Backend will run on http://localhost:5000"
echo "Frontend will be available at http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start



