import { useState } from 'react';
import { useBooks } from '../../viewmodels/useBooks';
import { useCreateBook } from '../../viewmodels/useCreateBook';
import { useUpdateBook } from '../../viewmodels/useUpdateBook';
import { useDeleteBook } from '../../viewmodels/useDeleteBook';
import { useAssignBook } from '../../viewmodels/useAssignBook';
import { useStudents } from '../../viewmodels/useStudents';
import { NavBar } from '../../components/shared/NavBar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import type { Book } from '../../models/types';
import { MoreHorizontal } from 'lucide-react';

export function TeacherDashboard() {
  const { data: books, isLoading, error } = useBooks();
  const { mutate: createBook } = useCreateBook();
  const { mutate: updateBook } = useUpdateBook();
  const { mutate: deleteBook } = useDeleteBook();
  const { mutate: assignBook } = useAssignBook();
  const { data: students } = useStudents();

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookForm, setBookForm] = useState({ title: '', description: '', coverImg: '' });

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assigningBookId, setAssigningBookId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  const [viewStudentsBook, setViewStudentsBook] = useState<Book | null>(null);

  const openCreate = () => {
    setEditingBook(null);
    setBookForm({ title: '', description: '', coverImg: '' });
    setIsBookModalOpen(true);
  };

  const openEdit = (book: Book) => {
    setEditingBook(book);
    setBookForm({ title: book.title, description: book.description || '', coverImg: book.coverImg || '' });
    setIsBookModalOpen(true);
  };

  const saveBook = () => {
    if (!bookForm.title) return toast.error('Title is required');
    if (editingBook) {
      updateBook({ id: editingBook.id, data: bookForm }, {
        onSuccess: () => { toast.success('Book updated'); setIsBookModalOpen(false); },
        onError: () => toast.error('Failed to update book'),
      });
    } else {
      createBook(bookForm, {
        onSuccess: () => { toast.success('Book created'); setIsBookModalOpen(false); },
        onError: () => toast.error('Failed to create book'),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      deleteBook(id, {
        onSuccess: () => toast.success('Book deleted'),
        onError: () => toast.error('Failed to delete book'),
      });
    }
  };

  const openAssign = (bookId: string) => {
    setAssigningBookId(bookId);
    setSelectedStudentId('');
    setAssignModalOpen(true);
  };

  const handleAssign = () => {
    if (!assigningBookId || !selectedStudentId) return toast.error('Select a student');
    assignBook({ bookId: assigningBookId, studentId: selectedStudentId }, {
      onSuccess: () => { toast.success('Book assigned successfully'); setAssignModalOpen(false); },
      onError: (err: any) => toast.error(err.message || 'Failed to assign book'),
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <NavBar />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Books</h2>
        <Button onClick={openCreate}>Create Book</Button>
      </div>

      {isLoading && <p>Loading books...</p>}
      {error && <p className="text-red-500">Failed to load books. Please try again.</p>}

      {!isLoading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books?.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  {book.assignments?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {book.assignments.slice(0, 2).map((assignment, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {assignment.student.username}
                        </span>
                      ))}
                      {book.assignments.length > 2 && (
                        <button
                          onClick={() => setViewStudentsBook(book)}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                          +{book.assignments.length - 2} more
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(book)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openAssign(book.id)}>Assign to Student</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(book.id)} className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {books?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No books found. Create one!</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={isBookModalOpen} onOpenChange={setIsBookModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBook ? 'Edit Book' : 'Create Book'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={bookForm.title} onChange={e => setBookForm({ ...bookForm, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input value={bookForm.description} onChange={e => setBookForm({ ...bookForm, description: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Cover Image URL</label>
              <Input value={bookForm.coverImg} onChange={e => setBookForm({ ...bookForm, coverImg: e.target.value })} />
            </div>
            <Button onClick={saveBook} className="w-full">{editingBook ? 'Update' : 'Create'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Book to Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Select onValueChange={setSelectedStudentId} value={selectedStudentId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a student">
                  {selectedStudentId 
                    ? students?.find(s => s.id === selectedStudentId)?.username 
                    : "Select a student"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {students?.map(student => (
                  <SelectItem key={student.id} value={student.id}>{student.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAssign} className="w-full">Assign</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewStudentsBook} onOpenChange={(open) => !open && setViewStudentsBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Students Assigned to "{viewStudentsBook?.title}"</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 pt-4 max-h-[60vh] overflow-y-auto">
            {viewStudentsBook?.assignments?.map((assignment, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-md bg-gray-50 border">
                <span className="text-sm font-medium">{assignment.student.username}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
