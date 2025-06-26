import {logout} from "@/actions";
import Image from "next/image";
import DragonFarm from "../images/DragonFarm.jpeg"

const HomePageForm = () => {
    return (
      <div className="bg-image-wrapper">
      <Image
        alt="DragonFarm"
        // Importing an image will
        // automatically set the width and height
        src={DragonFarm}
        sizes="100vw"

        // Make the image display full width
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
    )
}

export default HomePageForm
