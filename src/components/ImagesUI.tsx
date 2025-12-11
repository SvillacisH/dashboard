
interface ImagesUIProps {
     url?: string;
 }

function ImagesUI(prop: ImagesUIProps) {
  return (
    <div>
      <img 
      src={prop.url} 
      width="200px"
      height="200px" />
    </div>
  );
}

export default ImagesUI;