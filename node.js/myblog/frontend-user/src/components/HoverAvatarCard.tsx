import { formatDateMonthAndYear } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";

export default function HoverAvatarCard({entry}){
    return(
      <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Avatar className="size-6">
            <AvatarImage src={entry.author.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-primary-foreground">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={entry.author.image} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{entry.author.name}</h4>
            <p className="text-sm">
            {entry.author.about} 
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Joined {formatDateMonthAndYear(entry.author.registrationDate)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
    )
  }