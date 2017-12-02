obj =
  name: "lirawx"
  add: (x, y) -> x+y

console.log obj.name
console.log obj.add 1,2

square = (x) -> x*x
cube = (x) -> square(x) * x

isOn = true
if isOn
    console.log "hello"
else
    console.log "world"


gold = silver = rest = "unknown"

awardMedals = (first, second, others...) ->
    gold = first
    silver = second
    rest = others

contenders = [
    "Michael Phelps"
    "Liu Xiang"
    "Yao Ming"
    "Allyson Yesl"
]

awardMedals contenders...

console.log "Gold: " + gold
console.log "Silver :" + silver
console.log "Ther Feild :" + rest


# 吃午饭
eat food for food in ['toats', 'cheese', 'wine']


# key value

yearsOld = max: 10, ida: 9, tim: 11

ages = for child, age of yearsOld
    "#{child} is #{age}"

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

start = numbers[0..2]

middle = numbers[3...-2]

end = numbers[-2..]


eldest = if 24 > 21 then "liz" else "lik"

spped = 0

spped ?= 15



class Animal
  constructor: (@name) ->

  move: (meters) ->
    alert @name + " moved #{meters}m."

class Snake extends Animal
  move: ->
    alert "Slithering..."
    super 5

class Horse extends Animal
  move: ->
    alert "Galloping..."
    super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

sam.move()
tom.move()


theBait   = 1000
theSwitch = 0

[theBait, theSwitch] = [theSwitch, theBait]


weatherReport = (location) ->
    #ajax
    [location, 72, "Mostly Sunny"]

[city, temp, forecast] = weatherReport "Bering, CA"

futurists =
  sculptor: "Umberto Boccioni"
  painter:  "Vladimir Burliuk"
  poet:
    name:   "F.T. Marinetti"
    address: [
      "Via Roma 42R"
      "Bellagio, Italy 22021"
    ]

{poet: {name, address: [street, city]}} = futurists


tag = "<impossible>"

[open, contents..., close] = tag.split ""


class Person
  constructor: (options) ->
    {@name, @age, @height} = options

tim = new Person age: 4


Account = (customer, cart) ->
    @customer = customer
    @cart = cart

    $('shopping_cart').bind 'click', (event) =>
        @customer.purchase @cart


score = 76
grade = switch
  when score < 60 then 'F'
  when score < 70 then 'D'
  when score < 80 then 'C'
  when score < 90 then 'B'
  else 'A'
# grade == 'C'


switch day
  when "Mon" then go work
  when "Tue" then go relax
  when "Thu" then go iceFishing
  when "Fri", "Sat"
    if day is bingoDay
      go bingo
      go dancing
  when "Sun" then go church
  else go work


try
  allHellBreaksLoose()
  catsAndDogsLivingTogether()
catch error
  print error
finally
  cleanUp()


mobyDick = "Call me Ishmael. Some years ago --
  never mind how long precisely -- having little
  or no money in my purse, and nothing particular
  to interest me on shore, I thought I would sail
  about a little and see the watery part of the
  world..."


mobyDick = "Call me Ishmael. Some years ago --\
       never mind how long precisely -- having little\
  or no money in my purse, and nothing particular\
  to interest me on shore, I thought I would sail\
  about a little and see the watery part of the\
  world..."



html = """
       <strong>
         cup of coffeescript
       </strong>
       """


###
lirawx coffee script
###
