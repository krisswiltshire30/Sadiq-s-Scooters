describe('person', () => {

  let person;

  beforeEach(() => {
    person = new Person();
  })

  it('person moves when commanded to walk', () => {
    let originalLocation = person.location
    console.log(person)
    person.walk();
    console.log(person)

    expect(person.location.at(originalLocation)).toEqual(false);
  });

  it('returns true if person is at destination', () => {
    for (var i = 0; i < 50; i++) {
      person.walk();
    }
    expect(person.location.near(person.destination, person.speed)).toEqual(true);
  });

  it('by default person is not on a vehicle', () => {
    expect(person.vehicle).toEqual(undefined)
  })

});

describe('custom person', () => {

  it('person moves to destination if within speed', () => {
    person = new Person({
      location: new Location(0.1, 0.1),
      destination: new Location(0.8, 0.8),
      speed: 5
    })
    expect(person.location.at(person.destination)).toEqual(false);
    expect(person.location.near(person.destination, person.speed)).toEqual(true);

    person.walk()

    expect(person.location.at(person.destination)).toEqual(true);
    expect(person.location.near(person.destination, person.speed)).toEqual(true);

    expect(person.location.at(new Location(0.8, 0.8))).toEqual(true)

  });


  it('person moves to destination at angles', () => {
    person = new Person({
      location: new Location(0.8, 0.9),
      destination: new Location(0.2, 0.38),
      speed: 0.02
    })

    expect(person.location.at(person.destination)).toEqual(false);

    steps = 0
    while (!person.location.at(person.destination) && steps < 1000) {
      person.walk()
      steps++
    }

    expect(person.location.at(person.destination)).toEqual(true);

    person.walk();

    expect(person.location.at(new Location(0.2, 0.38))).toEqual(true)

  });

  it('person heads to destination and completes quest', () => {
    options = {
      location: new Location(0, 0),
      destination: new Location(0.5, 0),
      speed: 0.2,
    }
    person = new Person(options)

    person.walk() // to 0.2
    person.walk() // to 0.4
    person.walk() // to 0.5
    person.walk() // no movement, questCompleted == True
    expect(person.questCompleted).toEqual(true)

  })



  it('person follows path', () => {
    options = {
      location: new Location(0, 0.5),
      destination: new Location(1, 0.5),
      speed: 0.1,
      path: [
        new Location(0, 0.5)
      ]
    }
    person = new Person(options)

    for (let i = 0; i < 5; i++) {
      person.walk();
    }

    expect(person.questCompleted).toEqual(false)

    for (let i = 0; i < 10; i++) {
      person.walk();
    }

    expect(person.questCompleted).toEqual(false)
    for (let i = 0; i < 15; i++) {
      person.walk();
      person.walk();
    }
    person.walk();
    expect(person.questCompleted).toEqual(true)
  })



});

describe('person on scooter', () => {
  it('person on vehicle moves fast', () => {
    person_fast = new Person();
    person_fast.vehicle = new Scooter();
    person = new Person();

    person_fast.walk();
    person.walk();

    expect(person_fast.location.x).toBeGreaterThan(person.location.x);

  })
})