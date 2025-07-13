# Python Envy Jnr [UNSTABLE (though works) FOR UNSET DEFAULT]

Automatically activate Python virtual environments as you navigate the source code.

This is useful if you are working with a monorepo that contains sub-projects, modules, libraries or deployments with different Python dependencies. Or perhaps you want to automatically activate a development environment when you click on a test file.

Josh's edit: needed to configure python envy for my needs, hence: python envy junior. A folder structure on a monorepo project I am on doesn't use the .venv and there is no way to remove it and get the desired result hence, extending mine to work without configuring the default. Would have love to suggest to the main - Python Envy, but this configuration definitely feels awkwardly selfish to use

May also consider:

- walking the tree to support other envs just like is the default on ST4 for me.
- looking to cache the environments per workspace to make the call faster (not sure if it is possible but if it is, sure why not!)
- looking for other ways to make this faster.

## Features

As you can see in the following demo, the active Python environment changes as soon as a file is loaded into the editor. You may want to consider only enabling the extension for specific workspaces.

![demo](https://raw.githubusercontent.com/teticio/python-envy/main/images/screenshot.gif)

## Requirements

The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) must be enabled for this to work.

## Extension Settings

This extension has the following setting:

- `pythonEnvy.venv`: Location of the virtual environments. Set to `.venv` by default.

## Known Issues

N/A

## Release Notes

## [0.1.9]

- Fix issue #4.
