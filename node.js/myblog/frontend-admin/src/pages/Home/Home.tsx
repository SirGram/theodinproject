import Layout from "@/components/Layout";
import mockData from "../../../../shared/frontend/src/lib/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

("use client");

import * as React from "react";
import { MoreHorizontal, Trash } from "lucide-react";

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
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import HoverAvatarCard from "@/components/HoverAvatarCard";

function Settings() {
  const userData = { username: 'joe12', name: 'Joe', email: 'example@example', about: 'I like JS'};
  const [formData, setFormData] = useState(userData);

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <section>
      <form className="grid w-full max-w-sm items-center gap-1.5 ">
        <label htmlFor="username">Username</label>
        <Input className='bg-secondary mb-2' type="text" id="username" value={formData.username} onChange={(e)=>handleFormData(e)} />

        <label htmlFor="name">Name</label>
        <Input className='bg-secondary mb-2' type="text" id="name" value={formData.name} onChange={(e)=>handleFormData(e)} />

        <label htmlFor="email">Email</label>
        <Input className='bg-secondary mb-2' type="email" id="email" value={formData.email} onChange={(e)=>handleFormData(e)} />

        <label htmlFor="about">About</label>
        <Input className='bg-secondary mb-2' type="text" id="about" value={formData.about} onChange={(e)=>handleFormData(e)} />

        <label htmlFor="password">New password</label>
        <Input className='bg-secondary mb-2' type="password" id="password"  onChange={(e)=>handleFormData(e)} />

        <Button className="bg-primary w-24 my-2">Save</Button>
      </form>
    </section>
  );
}

export function Blog({ blog }) {
  // be able to edit only author blogs

  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none flex w-full items-center gap-2">
        <div className="w-24">
          <span
            className={` rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground  ${
              blog.published && "opacity-60"
            }`}
          >
            {blog.published ? "published" : "unpublished"}
          </span>
        </div>
        <div>
          <HoverAvatarCard author={blog.author} />
        </div>
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
            <DropdownMenuItem className="text-blue-600">
              <Trash className="mr-2 h-4 w-4" />
              Edit
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function Blogs() {
  const blogs = mockData.entries;
  console.log(blogs);
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full flex  items-center justify-start">
              <div className="flex-1">
                <span className="ml-2 mr-16">State</span>
                <span className="ml-2 mr-16">Creator</span>
                <span>Title</span>
              </div>
              <span className="right-0">Options</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </TableBody>{" "}
      </Table>
      <div className="w-full flex justify-end">
        <Button className="ml-4 my-2">Create new Entry</Button>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <Layout>
      <div className="w-full justify-start">
        <Tabs defaultValue="blogs">
          <TabsList className="grid w-[20rem]  grid-cols-3">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="create">Create Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="blogs">
            <Blogs />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
          <TabsContent value="create"></TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
