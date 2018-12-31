# D&D Encounter Helper

This is a tool designed to make managing many characters in combat much easier for a Dungeon Master.
Custom features of this tool include managing new initiatives rolls for each round, adding new
characters to combat, and adding many npcs to combat with a template system all at once.

### Running Locally

You will need to have Java installed the download link can be found here:
[Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html)

You will also need your environment variables configured
[Java Environment variables](https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html)

Then open a command prompt into the project directory and run:
```java
mvnw spring-boot:run
```

Finally open your web browser and navigate to: `localhost:8080`


Upcoming features:
- CR scale
- Filter by movement type (move, burrow, fly, swim)
- Filter by alignment (need to add this if we do this)
- Filter by types

Filter examples: https://donjon.bin.sh/5e/monsters/

Ian feedback Need:
- Display all armour classes on tiles
- Convert to fractions on Monster tiles

Ian feedback Nice to Have:
- Mark turn over option
- Condition tracking feature
- Condition expiry feature
- Would like changeable art
- Refactor combatant to be called Encounter
- Display "Combatant" for Lair actions

Universalize:
- Dark mode
- Refresh Initiative with round
- Scrolling search