import { useMyBooks } from '../../viewmodels/useMyBooks';
import { NavBar } from '../../components/shared/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { getImageUrl } from '../../lib/utils';

export function StudentDashboard() {
  const { data: assignments, isLoading, error } = useMyBooks();

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <NavBar />
      <h2 className="text-2xl font-bold mb-6">My Assigned Books</h2>

      {isLoading && <p>Loading your books...</p>}
      {error && <p className="text-red-500">Failed to load assigned books.</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments?.map((assignment) => (
            <Card key={assignment.id} className="overflow-hidden flex flex-col">
              {assignment.book.coverImg && (
                <div className="h-48 w-full bg-muted">
                  <img 
                    src={getImageUrl(assignment.book.coverImg)} 
                    alt={assignment.book.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{assignment.book.title}</CardTitle>
                <CardDescription>Assigned on {new Date(assignment.assignedAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{assignment.book.description || 'No description provided.'}</p>
              </CardContent>
            </Card>
          ))}
          {assignments?.length === 0 && (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              You haven't been assigned any books yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
