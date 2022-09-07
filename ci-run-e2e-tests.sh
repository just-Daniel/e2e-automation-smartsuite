echo "Building automation-ui"
npm i

{
    echo "Starting automation-ui"
    npm start
} &

cd e2e
echo "Building e2e"
npm i

echo "Running e2e tests"
npm test

echo "Terminating automation-ui"
# kill -9 $(lsof -ti:3000)
pkill -9 -f "npm"
exit 0