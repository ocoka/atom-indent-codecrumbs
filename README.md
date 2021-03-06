# Atom plugin package that adds breadcrumbs feature based on code indendation

Any language, can be easily extended to support more languages in aspect of crumbs colorization and clean filtering

![image](https://user-images.githubusercontent.com/8239290/58760756-20bcea00-8545-11e9-98d5-2ffd2da01c0f.png)


## How to add new color for crumbs
![No colors](https://user-images.githubusercontent.com/8239290/75099063-66877a00-55ce-11ea-8cb6-9f5c963c0c58.png)


1. Place the cursor in the editor on the row that you want to colorize in breadcrumbs
2. Invoke **CTRL-SHIFT-P** *(Command Pallete)*
3. Find command **Log cursor scope** and invoke it
4. ![Take scope](https://user-images.githubusercontent.com/8239290/75099076-8454df00-55ce-11ea-85fb-4a8b23f2d538.png)

Get scope from notification popup

5. Open user stylesheet ![Command to open stylesheet](https://user-images.githubusercontent.com/8239290/75099095-ba925e80-55ce-11ea-9245-d99bafd3011e.png)
6. Insert *import this plugin*
```less
@import (reference) 'packages/atom-indent-codecrumbs/styles/index';
```
7. Invoke special LESS mixin
```less
/* add color fur current language scope */
@import (reference) 'packages/atom-indent-codecrumbs/styles/index';
.codecrumbsAddColor(orange, ~'meta.property-list');
```
8. Feel the difference
![Result](https://user-images.githubusercontent.com/8239290/75099188-ce8a9000-55cf-11ea-9ce6-af1b01157a3e.png)

9. You can easily reconfigure component styles
![styling](https://user-images.githubusercontent.com/8239290/75111197-26fd7400-5648-11ea-99b8-099b4f7c6030.png)
```less
// same import 
@import (reference) 'packages/atom-indent-codecrumbs/styles/index';
// set parameters
@codecrumbs-height: 14px; // corners height (crumbs will have height = @codecrumbs-height * 2)
@codecrumbs-width: 10px; // corners width
@codecrumbs-max: 26ch; // max crumb width, text will have ellipsis
@codecrumbs-min: 5ch; // min crumb width
@codecrumbs-font: 1.2rem; // font-size
// after parameters set invoke reconfiguration mixin
.codeCrumbsReconfigure();
```
Of course you can do any styling you want just by overriding CSS rules in your user style.less
