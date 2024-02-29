# db_ignore_node_modules
```
A quick & dirty solution to
set DropBox to recursively ignore all node_modules dirs.
```

[![Build(NodeJS)](https://github.com/CryptoHubTeam/evm-indexer/actions/workflows/build.yml/badge.svg)](https://github.com/AsafY/db_ignore_node_modules/actions/workflows/build.yml)

including node_modules in DropBox backup takes unneeded space and causes all sorts of issues with node debugging

Dropbox does not allow you to set a global ignore pattern.
see:
https://www.dropboxforum.com/t5/Dropbox-ideas/Add-dropboxignore-directory-to-exclude-folders-without-using/idi-p/5926/page/2#comments

which forces you to set ignore of each file individually:
```
Set-Content -Path 'C:\Dropbox\projects\***\node_modules' -Stream com.dropbox.ignored -Value 1
```

This piece of code allows you to recursively ignore all 1st level node_modules dirs under the DropBox dir.

Usage:
- Build the project.
- RUN: node db_ignore_node_modules "__YOUR__DROPBOX__PROJECTS__DIR__ROOT"