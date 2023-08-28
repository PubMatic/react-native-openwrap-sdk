import { POBLocation } from '../../models/POBLocation';

test('testCreateLocation', () => {
  var location: POBLocation = new POBLocation(
    POBLocation.Source.GPS,
    11.0,
    122.0
  );
  expect(location.source).toBe(POBLocation.Source.GPS);
  expect(location.latitude).toBe(11.0);
  expect(location.longitude).toBe(122.0);
});

test('testGetSource', () => {
  expect(POBLocation.Source.GPS).toBe(1);
  expect(POBLocation.Source.IP_ADDRESS).toBe(2);
  expect(POBLocation.Source.USER).toBe(3);
});
