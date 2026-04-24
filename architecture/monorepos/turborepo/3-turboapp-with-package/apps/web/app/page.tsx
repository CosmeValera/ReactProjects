import { add } from '@repo/math/add';
 
function Page() {
  return <div><h1>{add(1, 5)}</h1></div>;
}
 
export default Page;