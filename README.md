# Schedule Shutdown

A Minecraft data pack containing functions that will stop the server after a duration of time.

**Important**: To use this datapack, you need to be running a dedicated server with `function-permission-level` in `server.properties` to `4`. This datapack **will not function** (get it? :D) in a singleplayer world.

**Important**: Except for `NO_AUTO_SHUTDOWN.zip`, all versions will automatically shut down the server after the specified length of time. See [Auto-Shutdown](#auto-shutdown) for an explanation of what this means and why I did it like that.

Below is a list of available delays. Each one triggers the one below it. (I did this in a not dumb way, with 5hrs triggering 1hr after 4hrs, 1hr trigger 15min after 45min, etc.)

- 5hrs
- 1hr
- 15min
- 5min
- 1min

Any scheduled shutdowns are cancelled upon starting the server.

## Examples

```mcfunction
# Shut down the server in 5hrs. See src/data/schedule_shutdown/functions/delay/* for function names.
function schedule_shutdown:delay/five_hours

# Cancel a scheduled shutdown.
function schedule_shutdown:clear_all
```

## Auto-Shutdown

I originally made this datapack because I had figured out how to host a Minecraft server in GitHub Actions, but needed the server to automatically close with enough time left to save the server state to the repo. That's why there is a 5 hour version (max GitHub workflow run time is 6 hours). The files with a name like `length_of_time.zip` will automatically run the function `schedule_shutdown:delay/length_of_time` when the server loads (using Minecraft's `load.json`). Unless you want your server to automatically shut down after a length of time, use `NO_AUTO_SHUTDOWN.zip`.

## FAQ/Troubleshooting

<details>
  <summary>Failed to load function schedule_shutdown:shutdown</summary>

  Same as `Couldn't load tag schedule_shutdown:all_shutdown as it is missing following references: schedule_shutdown:shutdown`.
</details>

<details>
  <summary>Couldn't load tag schedule_shutdown:all_shutdown as it is missing following references: schedule_shutdown:shutdown</summary>

  Make sure you set the `function-permission-level` in `server.properties` to `4` and try starting the server again. If you still have this error, please open an issue in the GitHub repo.
</details>
