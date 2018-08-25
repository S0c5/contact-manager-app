
open_iterm(){
    osascript \
    -e 'tell application "iTerm" to activate' 
}

database() {
  osascript \
  -e 'tell application "iTerm" to activate' \
  -e 'tell application "System Events" to tell process "iTerm" to keystroke "t" using command down' \
  -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd '$(pwd)'; cd infrastructure; docker-compose -f local-db.yml up;"' \
  -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

app() {
  osascript \
    -e 'tell application "iTerm" to activate' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "t" using command down' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd '$(pwd)'; cd app; npm start;"'\
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}


api() {
  osascript \
  -e 'tell application "iTerm" to activate' \
  -e 'tell application "System Events" to tell process "iTerm" to keystroke "t" using command down' \
  -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd '$(pwd)'; cd api; npm start;"'\
  -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}


open_browser() {
  osascript \
  -e 'tell application "iTerm" to activate' \
  -e 'tell application "System Events" to tell process "iTerm" to keystroke "t" using command down' \
  -e 'tell application "System Events" to tell process "iTerm" to keystroke "open \"http://localhost:3000\""' \
  -e 'tell application "System Events" to tell process "iTerm" to key code 52'\
  -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

run_dev(){
    open_iterm
    sleep 5
    database
    sleep 8
    api
    sleep 2
    app
    sleep 8
    open_browser
}

run_dev

