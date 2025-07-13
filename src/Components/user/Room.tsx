import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import demo from "../../../public/assets/maps/demo.png";
const Room = () => {
  return (
    <div className="mt-6 flex flex-col h-60 w-90">
      <img
        src={demo}
        alt="Image"
        className="rounded-xl scale-100 object-cover h-56 w-90 origin-center cursor-pointer"
      />
      <div className="flex justify-between text-white mt-2">
        <p className="px-2">Room Name</p>
        <div className="flex gap-2">
          <p className="text-sm">13/07/2025</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="rotate-90">...</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                Manage Space
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Edit Map
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
              >
                Delete{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Room;
