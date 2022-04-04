# JVissers JET-Cocktails

## Choices, choices (Structure, frameworks and libs/tools)

### Project structure

This app's structure will mainly follow the following structure:

- RootComponent folder
  - index.tsx
  - RootComponent.tsx
  - components/
    - will contain all generic, shared, components for this level, and below
  - utils/
    - will contain all utils for this level, and below
  - hooks/
    - will contain all hooks for this level, and below
  - interfaces/
    - will contain all interfaces for this level, and below
  - enums/
    - will contain all enums for this level, and below
  - {NameOfRootComponentFragment}/
    - will essentially contain a repeat of the structure above (if applicable), but this time scoped on the ComponentFragment (e.g a Header, or Footer or something more specifc, Favorite list)

Setting up the project likes this is intended to give an easier overview of where certain code "lives", it allows for a logical division of code aswell as grouping the code as close as possible to where it is being used.
Promoting some code up into a shared piece is fairly straightforward. Asking the question "Is this piece code shared with multiple of my Fragments?" If yes move it up, until it no longer is shared above that level. Sometimes something is so obviously generic that it doesn't really have a home except at the top. (these should remain relatively rare/low in number in the grand scheme of things)
This structure can, in essence, be infintely nested. Although at one point, variable on project size I suppose, a question should probably be raised if things arent becoming too finely grained, and/or reflect on if the project overview is still maintained.

### [React](https://github.com/facebook/react/))

I am currently, most familar with React, so instead of spending extra time on picking up Vue again, I went with React. I like it for it's flexibility, as the framework does not have a lot of bells and whistles by way of structure. This gives freedom, and that freedom makes it very malleable. I've also found it can also be a risk when there is a lack of project structure or general experience with React component composition.

#### [Create React App](https://github.com/facebook/create-react-app))

Is just an easy and quick way to setup a simple React APP, it comes packaged with some "sensible defaults" aswell as Typescript, Jest and React-testing-library. All of which I was wanted to use anyway.
But mostly I ended up going for CRA, as did not want to spend a lot of, my limited, time focussing on wiring up for this challenge. Should there be a desire to deviate from these CRA defaults, CRA offers an eject script which lets you parachute out of setup without breaking it as it rewires the scripts for you, which is nice and then allows for whatever custom bundling/tooling you want.

#### No router

Skipped a router, seemed a bit too overkill for the requirements. Went with a true true SPA

#### React custom hooks

Allow a dev to effectively use state and other React features without having to write a component class or function for it. This allows you to effectively share logic between multiple components with the caveat that they must start with 'use', cannot be used conditionally called (when applied in a component), aswell as that the component used must be a functional component. They can be built up on top of eachother aswell, which can be used to allow for some cool compoisitions. One could start out with some generic shared functionality and then layer/build more specific shareable logic on the top of that.

I've used custom hooks here mainly to construct sets of preconfigured api calls. (useXApi) Primarily for grouping the similar apis and their handling together where, applicable. I could identify, 2 main groups, being getting and dealing with cocktail data, aswell as getting an dealing with cocktail filter data.

These more specific custom hooks are in turn built on top of a more generic useFetchApi hook, that knows less about the context that it will be used in. Generic code like this, could easiliy be part of a wider generic libary, not necessarily contained within this project, but all that was overkill right now. The more generic variant also allows for the overrideing of the call options, with which requests can be tweaked (like alternate caching etc.) on per use basis.

### [Grommet components](https://github.com/grommet/grommet))

The components are easy to use, offer alot of basic functionality out of the box, have great a11y support aswell a couple of utils (like infinite scroller) which I might end up using here. I like and prefer it for it's component simplicity aswell as functional focus, which allows a user of the lib to primarily focus on implementing/composing the basic Grommet components into whatever they want to create. Their approach is more inline with my own view on how generic component lib should be setup, clear responsability aswell as simple while maintaining flexability.

Using premade, basic, components is a big time saver, altho it does come at a potential cost (extra depedencies, "lock-in") so it might not be the best approach for every project. I went for it here, so I could instead focus more on the overall architecture and app specific components necessary to create the functional requirements of the challenge.

#### Style override NOT IMPLEMENTED YET

Using Grommet I set up a custom theme to make the App more JETy, should I have extra time for a bonus point. In that case I'll probably focus more on the State management

### Testing (Jest + React-testing-library)

Jest + React-testing-library, a common testing setup within the React community. It came with CRA, but had it not I would have still chosen to use them. I might also look into setting up Cypress for some e2e testing, but timewise I will have to see.

Comment: Ended up not using Cypress, for now atleast, mainly due to time. The good thing is that react-testing-library is, by design, already pretty integration test focussed

### App state management NOT IMPLEMENTED YET [Fluxible](https://github.com/aprilmintacpineda/fluxible-js))

Not sure if i'll get to this before the deadline. But i've looked into using Fluxible, for state management, it promises a small and fast, event-driven, state management with async support aswell as persistence of state.
Which I would use to store, and load, the Ids of the Cocktails that a user 'liked' from localStorage after which the details could then be gotten from the cocktail detail API and shown in the list, perhaps always on or with a toggle/tabs.

#### API data

I've chosen to place some convertors there where the API data enters the App, to ensure that there is a disconnect between the API and APP when it comes to the data. This allows for the app to remain consistent internally when thinking/talking about data. As long as whichever API is being used is converted to the expected format there should be no issue. This also allows for the eventuallity of swapping out an API or allows for multiple data sets being used. While that was a major reason to put something between it all another big reason was that when looking at the data I judged it rather messy. I figured it was going to be extremely annoying to cleanly deal with, so instead of dealing with it X times, I decided to deal with it once at the converter level. This allowed me to gather multiple thigs into arrays (like ingredients, measurements, tags etc.) aswell as rename some keys to better, and cleanly, describe their purpose. Should there ever be a need for a reversal i.e. sending of APP data to an api, a reverse converter could then be written to solve the same issue.

When it comes to the App's state management, I decided to, for the most part, keep the data there where the responsibility of that data lies. So for instance. The App.tsx, at it's highest level, given the requirements, does not need to know all of the cocktails that I just recieved from my query in the CocktailSearcbar.tsx. The getting and showing of that data is the responsiblity of the CocktailSearcbar component, so as such the data should probably remain there, until a case comes up where the data is required across components.

An example of this occuring is the selectedCocktail state. While the CocktailSearcbar needs to know what cocktail has been selected, the CocktailDetails components will also need to know what cocktail has been selected. They both share the same parent, so instead of adding alot of app wide structure for something relatively trivial I decided that their linking pin, the App.tsx, should just be notified by the CocktailSearcbar when the selectedCocktail had changed so that the App.tsx could keep that piece of state aswell and pass it down to it's child (CocktailDetails). This does result in the selectedCocktail technically existing in two pieces of app state, but that seemed a worthwile trade-off. It also allowed for a small disconnect between the CocktailSearcbar, resetting the selected cocktail, when starting a new search, and the CocktailDetails still showing the "previously selected cocktail" which I thought was neat.

## Available Scripts (Bootstrapped by [Create React App](https://github.com/facebook/create-react-app))

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
