c1 = Player.create(name: "Katrina")
c2 = Player.create(name: "Charlie")

h1 = Score.create(time:150)
h2 = Score.create(time:100)

Round.create(player: c1, score: h1)
Round.create(player: c2, score: h2)
