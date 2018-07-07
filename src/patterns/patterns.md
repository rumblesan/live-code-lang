# Patterns

The pattern syntax is heavily influenced by [Tidal Cycles](https://tidalcycles.org) but somewhat simplified.

## Syntax

Very similar to Tidal.

```
 [a-zA-Z0-9]+ = value
 ~            = rest
 [            = start subpattern
 ]            = finish subpattern
 {            = start concurrent values
 }            = finish concurrent values
```

## Types

```
type Time = Number
type Value = String
type Event = { start: Time, end: Time, value: Value }
type Pattern = (start: Time, end: Time) => [Event]
```

## Scheduling

Currently scheduling is left up to the implementator of the runtime that live lang is used in.
