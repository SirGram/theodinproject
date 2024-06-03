import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { IBlogEntry } from "@/types/types";

import { MoreHorizontal, Trash } from "lucide-react";
import HoverCardMarkdownHelp from "./components/HoverCardMarkdownHelp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { useBlogsQuery, useUsersQuery } from "@/api/queries";

import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import AdjustedMarkdown from "@/components/AdjustedMarkdown";
import { formatDate } from "@/lib/utils";

function Settings() {
  const userData = {
    username: "joe12",
    name: "Joe",
    email: "example@example",
    about: "I like JS",
  };
  const [formData, setFormData] = useState(userData);

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleDeleteAccount = () => {
    
  }

  return (
    <section>
      <form className="grid w-full max-w-sm items-center gap-1.5 ">
        <label htmlFor="username">Username</label>
        <Input
          className="bg-secondary mb-2"
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => handleFormData(e)}
        />

        <label htmlFor="email">Email</label>
        <Input
          className="bg-secondary mb-2"
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleFormData(e)}
        />

        <label htmlFor="about">About</label>
        <Input
          className="bg-secondary mb-2"
          type="text"
          id="about"
          value={formData.about}
          onChange={(e) => handleFormData(e)}
        />

        <label htmlFor="password">New password</label>
        <Input
          className="bg-secondary mb-2"
          type="password"
          id="password"
          onChange={(e) => handleFormData(e)}
        />

        <Button className="bg-primary w-24 my-2">Save</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </section>
  );
}

export function Blog({ blog }: { blog: IBlogEntry }) {
  // be able to edit only author blogs

  const [open, setOpen] = useState(false);

  return (
    <article className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none flex w-full items-center gap-2">
        <span className="w-24">
          <span
            className={` rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground  ${
              blog.published && "opacity-60"
            }`}
          >
            {blog.published ? "published" : "unpublished"}
          </span>
        </span>
        <span>
          <HoverAvatarCard entry={blog} />
        </span>
        <span className="text-muted-foreground">{blog.title}</span>
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="flex items-center w-full">
              <NewBlog buttonText="Edit Blog" entry={blog} />
            </div>
            <DropdownMenuItem className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
}

function NewBlog({
  entry,
  buttonText = "New Blog",
}: {
  entry?: IBlogEntry;
  buttonText?: string;
}) {
  const [formData, setFormData] = useState({
    title: entry?.title || "",
    content: entry?.content || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-4 w-full">{buttonText}</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <Tabs defaultValue="edit">
          <TabsList className="grid w-[20rem]  grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="p-2 ">
            <div className="flex flex-col h-full">
              <Label htmlFor="title" className="text-left mb-2 p-2">
                Title
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e)}
                  className="mt-2"
                />
              </Label>

              <Label htmlFor="content" className="text-left">
                Markdown Content
                <HoverCardMarkdownHelp />
                <Textarea
                  onChange={(e) => handleChange(e)}
                  id="content"
                  value={formData.content}
                  className="mt-2 flex-1 h-96 resize-none"
                />
              </Label>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <h1 className="mb-6">{formData.title}</h1>
            <div className="h-screen overflow-y-scroll text-wrap">
              <AdjustedMarkdown children={formData.content} />
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Post blog</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
function Blogs() {
  const { data } = useBlogsQuery();
  const blogs = data;
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full flex  items-center justify-start">
              <p className="flex-1">
                <span className="ml-2 mr-16">State</span>
                <span className="ml-2 mr-16">Creator</span>
                <span>Title</span>
              </p>
              <span className="right-0">Options</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <Blog blog={blog} key={blog._id} />
          ))}
        </TableBody>{" "}
      </Table>
      <div className="w-full flex justify-end">
        <div className="w-24">
          <NewBlog />
        </div>
      </div>
    </section>
  );
}

function Users() {
  const { data } = useUsersQuery();

  return (
    <section className="flex flex-col">      
          <Table >
            <TableHeader>
              <TableRow >
                <TableHead >Username</TableHead>
                <TableHead>Fullname</TableHead>
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{formatDate(new Date(user.registrationDate))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
       
      <div className="col-span-2">
          <div className="w-full flex justify-end">
            <div className="w-24 mr">
              <NewAdmin />
            </div>
          </div>
        </div>
    </section>
  );
}
function NewAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
  });
  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-4 w-full">New Admin</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>New Admin</SheetTitle>
          <SheetDescription>Add administrator to the database</SheetDescription>
        </SheetHeader>
        <form className="flex flex-col mt-4 mb-4">
          <Label htmlFor="fullname" className="text-left mb-3">
            Fullname
            <Input
              id="fullname"
              placeholder="Pedro Duarte"
              value={formData.fullname}
              onChange={(e) => handleFormData(e)}
              className="mt-2"
            />
          </Label>

          <Label htmlFor="fullname" className="text-left  mb-3">
            Username
            <Input
              id="username"
              placeholder="duarte123"
              value={formData.username}
              onChange={(e) => handleFormData(e)}
              className="mt-2"
            />
          </Label>

          <Label htmlFor="email" className="text-left  mb-3">
            Username
            <Input
              id="email"
              type="email"
              placeholder="duarte@example.com"
              value={formData.email}
              onChange={(e) => handleFormData(e)}
              className="mt-2"
            />
          </Label>

          <Label htmlFor="password" className="text-left mb-3">
            Password
            <Input
              id="password"
              type="password"
              placeholder="mypassword"
              value={formData.password}
              onChange={(e) => handleFormData(e)}
              className="mt-2"
            />
          </Label>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function Admin() {
  return (
    <Layout showAside={false}>
      <div className="w-full justify-start p-2">
        <Tabs defaultValue="blogs">
          <TabsList className="grid w-[20rem]  grid-cols-3">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="blogs">
            <Blogs />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
          <TabsContent value="users">
            <Users />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
