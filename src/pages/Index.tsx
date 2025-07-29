import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Coins, User, Camera, Video, Radio, LogOut, Settings, Plus } from 'lucide-react';

const Index = () => {
  const { user, profile, credits, signOut, loading } = useAuth();

  // Redirect to auth if not logged in
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary">
        <div className="flex flex-col items-center space-y-4">
          <Crown className="h-8 w-8 animate-pulse text-primary" />
          <p className="text-muted-foreground">Loading your luxury experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Luxe Content
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Credits Display */}
              <div className="flex items-center space-x-2 bg-card/50 rounded-lg px-3 py-2 border border-border/50">
                <Coins className="h-4 w-4 text-primary" />
                <span className="font-semibold">{credits?.balance || 0}</span>
                <span className="text-sm text-muted-foreground">credits</span>
              </div>
              
              {/* Profile */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-card/50 rounded-lg px-3 py-2 border border-border/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile?.display_name || profile?.username || 'User'}</span>
                  {profile?.is_creator && (
                    <Badge variant="secondary" className="text-xs">Creator</Badge>
                  )}
                </div>
                
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-primary" />
                  Welcome{profile?.display_name ? `, ${profile.display_name}` : ''}!
                </CardTitle>
                <CardDescription>
                  {profile?.is_creator 
                    ? "Manage your content and engage with your audience"
                    : "Discover premium content from amazing creators"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Camera className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Photos</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Premium photo content</p>
                      <p className="text-xs text-muted-foreground mt-1">Starting from 5 credits</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Video className="h-5 w-5 text-secondary-foreground" />
                        <CardTitle className="text-lg">Videos</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Exclusive video content</p>
                      <p className="text-xs text-muted-foreground mt-1">Starting from 20 credits</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Radio className="h-5 w-5 text-accent-foreground" />
                        <CardTitle className="text-lg">Live Streams</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Interactive live content</p>
                      <p className="text-xs text-muted-foreground mt-1">Starting from 50 credits</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Content Feed Placeholder */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Discover Content</CardTitle>
                <CardDescription>Premium content from verified creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Content feed coming soon...</p>
                  <p className="text-sm text-muted-foreground mt-2">Browse amazing content from our creators</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Actions */}
            {profile?.is_creator && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Creator Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Content
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Radio className="h-4 w-4 mr-2" />
                    Go Live
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Content
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Credits Management */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-primary" />
                  Your Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{credits?.balance || 0}</div>
                  <p className="text-sm text-muted-foreground">Available Credits</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="font-semibold">{credits?.total_purchased || 0}</div>
                    <div className="text-muted-foreground">Purchased</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="font-semibold">{credits?.total_spent || 0}</div>
                    <div className="text-muted-foreground">Spent</div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Buy Credits
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <Badge variant={user?.email_confirmed_at ? "default" : "destructive"}>
                    {user?.email_confirmed_at ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Age Verified</span>
                  <Badge variant={profile?.age_verified ? "default" : "secondary"}>
                    {profile?.age_verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                {profile?.is_creator && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Creator Status</span>
                    <Badge variant={profile?.is_verified ? "default" : "secondary"}>
                      {profile?.is_verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
