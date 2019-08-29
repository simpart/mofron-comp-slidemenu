# mofron-comp-slidemenu
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

slide menu component for mofron


# Install
```
npm install mofron mofron-comp-slidemenu
```

# Sample
```html
<require>
    <tag module="mofron-comp-slidemenu">SlideMenu</tag>
    <tag module="mofron-comp-txtframe">TxtFrame</tag>
</require>

<SlideMenu size=2rem,1rem mainColor=#e6e6fa>
    <item>
        <TxtFrame>menu 1</TxtFrame>
        <TxtFrame>menu 2</TxtFrame>
        <TxtFrame>menu 3</TxtFrame>
    </item>
</SlideMenu>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | switch | component | switch component |
| | menu | component | menu component |
| | item | array | menu item components |
| | position | string | position type ["left","right"] |
| | mainColor | mixed (color) | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | baseColor | mixed (color) | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |
| | accentColor | mixed (color) | string: color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | option | style option |

