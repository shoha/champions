```mermaid
stateDiagram-v2

    Fetching: Fetching characters
    Init: Initializing

    [*] --> Init
    Init --> Fetching: User has logged in
    Fetching --> Empty: No characters available
    Fetching --> Playing: At least one character available
    Empty --> Creating
    Playing --> Creating
    Creating --> Playing: Character created
    Creating --> Empty: Cancelled
    Playing --> Playing: Choosing a different character

    Note left of Init: Root state on load
    Note left of Login: Done through oauth
    Note left of Fetching: Will choose one character to trainsition to playing
```
