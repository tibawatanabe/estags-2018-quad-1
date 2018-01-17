import { AsyncStorage } from 'react-native';

export class DataStorage  {
  save (name: string, data: string) {
    AsyncStorage.setItem(name, data);
  }

  delete (name: string) {
    AsyncStorage.removeItem(name);
  }

  load (name: string) {
    return AsyncStorage.getItem(name)
  }
}
