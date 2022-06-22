# Deno Image Rotator
This script rotates all images in a directory and all sub-directories by a specified amount using [Deno](https://deno.land/) and [imagescript](https://deno.land/x/imagescript@v1.2.13).

## Prerequisites
Ensure [Deno](https://deno.land/manual/getting_started/installation) is installed.

## How to use
Navigate into the root `deno-image-rotator` directory and run:

```
deno run --allow-read --allow-net --allow-write main.ts [directory] [rotation]
```

## Examples
If you want to rotate all images in the `./img` directory by `90` degrees:

```
deno run --allow-read --allow-net --allow-write main.ts ./img 90
```