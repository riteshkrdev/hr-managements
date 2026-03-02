// mock-employees.ts
import { Employee } from '../model/employee.model';

const firstNames = [
  'John','Emma','Michael','Sophia','James','Olivia','William','Ava','Benjamin','Isabella',
  'Lucas','Mia','Henry','Charlotte','Alexander','Amelia','Daniel','Harper','Matthew','Evelyn'
];

const lastNames = [
  'Smith','Johnson','Brown','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin',
  'Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee','Walker','Hall'
];

const departments = [
  'IT',
  'HR',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Support'
];

export const MOCK_EMPLOYEES: Employee[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;

  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];

  return {
    id: id.toString(),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@company.com`,
    department: departments[i % departments.length],
    salary: 50000 + (i * 1200),
    active: i % 4 !== 0
  };
});