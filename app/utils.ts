export const fullname = (
  i?: Object & { firstname: string; lastname: string }
) => (i ? `${i.firstname} ${i.lastname}` : "Unknown");
