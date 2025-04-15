import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  nome: string;
  sobrenome: string;
  username: string;
  grupo: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    email: "john@example.com",
    nome: "John",
    sobrenome: "Doe",
    username: "johndoe",
    grupo: "Admin",
  },
  {
    id: 2,
    email: "jane@example.com",
    nome: "Jane",
    sobrenome: "Smith",
    username: "janesmith",
    grupo: "User",
  },
];

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    email: "",
    nome: "",
    sobrenome: "",
    username: "",
    grupo: "",
  });

  //   const handleEdit = (id: number, field: keyof User, value: string) => {
  //     setUsers((prev) =>
  //       prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
  //     );
  //   };

  const handleSubmitEdit = () => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    toast.success("User updated successfully!");
    setEditingUser(null);
  };

  const handleAddUser = () => {
    const id = users.length + 1;
    setUsers([...users, { id, ...newUser }]);
    toast.success("User added successfully!");
    setNewUser({ email: "", nome: "", sobrenome: "", username: "", grupo: "" });
    setModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">User List</h2>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(newUser) as (keyof typeof newUser)[]).map(
                (field) => (
                  <Input
                    key={field}
                    placeholder={field}
                    value={newUser[field]}
                    onChange={(e) =>
                      setNewUser({ ...newUser, [field]: e.target.value })
                    }
                  />
                )
              )}
            </div>
            <Button onClick={handleAddUser}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Sobrenome</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.sobrenome}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.grupo}</TableCell>
              <TableCell>
                <Dialog onOpenChange={(open) => !open && setEditingUser(null)}>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditingUser(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="space-y-4">
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(newUser) as (keyof typeof newUser)[]).map(
                        (field) => (
                          <Input
                            key={field}
                            value={editingUser?.[field] || ""}
                            onChange={(e) =>
                              setEditingUser((prev) =>
                                prev
                                  ? { ...prev, [field]: e.target.value }
                                  : null
                              )
                            }
                          />
                        )
                      )}
                    </div>
                    <Button onClick={handleSubmitEdit}>Save</Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
