
/**
 * Original from:
 * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * 
 * simple uniqueId
 * @returns 
 */
export function uniqueId() {
  return ('xxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }));
}

export function* idMaker(start = 0) : Generator<number> {
  let index = start;
  while (true) {
    yield index++;
  }
}
