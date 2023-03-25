export const fullname = (
  i?: Object & { firstname: string; lastname: string }
) => (i ? `${i.firstname} ${i.lastname}` : "Unknown");

export function isNotNull<T>(arg: T): arg is Exclude<T, null> {
  return arg !== null;
}
