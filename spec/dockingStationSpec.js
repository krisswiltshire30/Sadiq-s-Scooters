describe('docking station', () => {
  let dockingStation;
  let world = new World()
  beforeEach(() => {
    dockingStation = new DockingStation(world, {
      vehicleClass: Scooter
    });
  });


  it('docking station default location is map center', () => {
    expect(dockingStation.location.x).toEqual(0.5)
    expect(dockingStation.location.y).toEqual(0.5)
  });

  it('docking station default cost', () => {
    expect(dockingStation.cost).toEqual(50)
  });


  it('docking station default capacity', () => {
    expect(dockingStation.capacity).toEqual(10)
  });


  it('docking station releases an object with speed', () => {
    expect(Object.keys(dockingStation.release())).toContain('speed')
  });

  it('docking station accepts a vehicle', () => {
    // Will need to mock Player / points for this so that the player gets points once a journey is completed.
    expect(dockingStation.dock()).toEqual(true);
  });

  it('docking station default price per ride', () => {
    expect(dockingStation.pricePerRide).toEqual(5)
  });

  it('docking station capacity can be increased', () => {
    dockingStation.increaseCapacity()
    expect(dockingStation.capacity).toEqual(12)
  });

  it('docking station dockedVehicles decreases as scooters are taken out', () => {
    dockingStation.release()
    dockingStation.release()
    expect(dockingStation.dockedVehicles).toEqual(3)
  });

  it('docking station spaces increases as scooters are docked', () => {
    dockingStation.release()
    dockingStation.release()
    dockingStation.dock()
    expect(dockingStation.dockedVehicles).toEqual(4)
  });

  it('docking station cant accept scooter if it is full', () => {
    dockingStation.dock()
    expect(dockingStation.dockedVehicles).toEqual(6)
  });


  it('a docking station cannot release a scooter when its empty', () => {
    let i
    for (i = 0; i < 11; i++) {
      dockingStation.release()
    }


    expect(dockingStation.dockedVehicles).toEqual(0)
  });

});

describe('unique docking station', () => {
  let world = new World();
  it('docking station accepts a unique location', () => {
    dockingStation = new DockingStation(world, {
      location: new Location(0, 0)
    })
    expect(dockingStation.location.x).toEqual(0)
    expect(dockingStation.location.y).toEqual(0)
  });
  it('docking station accepts a unique cost', () => {
    dockingStation = new DockingStation(world, {
      cost: 25
    })
    expect(dockingStation.cost).toEqual(25)
  });
});