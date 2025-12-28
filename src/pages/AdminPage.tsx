import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/common/PageHeader';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Player } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

interface PlayerFormData {
  firstName: string;
  lastName: string;
  teamId: string;
  position: Position;
  number: number;
  height: number;
  weight: number;
  nationality: string;
  birthDate: string;
  ppg: number;
  rpg: number;
  apg: number;
  efficiency: number;
}

const emptyFormData: PlayerFormData = {
  firstName: '',
  lastName: '',
  teamId: '',
  position: 'PG',
  number: 0,
  height: 190,
  weight: 85,
  nationality: '',
  birthDate: '',
  ppg: 0,
  rpg: 0,
  apg: 0,
  efficiency: 0,
};

function AdminContent() {
  const { players, teams, addPlayer, updatePlayer, deletePlayer, getTeamById } = useData();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<PlayerFormData>(emptyFormData);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAddDialog = () => {
    setEditingPlayer(null);
    setFormData(emptyFormData);
    setDialogOpen(true);
  };

  const openEditDialog = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      firstName: player.firstName,
      lastName: player.lastName,
      teamId: player.teamId,
      position: player.position,
      number: player.number,
      height: player.height,
      weight: player.weight,
      nationality: player.nationality,
      birthDate: player.birthDate,
      ppg: player.stats.ppg,
      rpg: player.stats.rpg,
      apg: player.stats.apg,
      efficiency: player.stats.efficiency,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.teamId) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const playerData: Omit<Player, 'id'> = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      teamId: formData.teamId,
      position: formData.position,
      number: formData.number,
      height: formData.height,
      weight: formData.weight,
      nationality: formData.nationality.trim(),
      birthDate: formData.birthDate,
      stats: {
        ppg: formData.ppg,
        rpg: formData.rpg,
        apg: formData.apg,
        efficiency: formData.efficiency,
      },
    };

    try {
      if (editingPlayer) {
        await updatePlayer(editingPlayer.id, playerData);
        toast({ title: 'Success', description: 'Player updated successfully.' });
      } else {
        await addPlayer(playerData);
        toast({ title: 'Success', description: 'Player added successfully.' });
      }
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save player.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (playerId: string) => {
    try {
      await deletePlayer(playerId);
      setDeleteConfirm(null);
      toast({ title: 'Success', description: 'Player deleted successfully.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete player.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <PageHeader
          title="Admin Panel"
          subtitle="Manage players in the system"
        >
          <Button onClick={openAddDialog} className="gap-2">
            <Plus className="h-4 w-4" /> Add Player
          </Button>
        </PageHeader>

        {/* Players Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Player</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Team</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Position</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">PPG</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">EFF</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => {
                  const team = getTeamById(player.teamId);
                  return (
                    <tr key={player.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display text-primary">
                            #{player.number}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{player.firstName} {player.lastName}</p>
                            <p className="text-sm text-muted-foreground">{player.nationality}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-foreground">{team?.name || 'Unknown'}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                          {player.position}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-foreground">{player.stats.ppg}</td>
                      <td className="py-4 px-4 text-center text-primary font-semibold">{player.stats.efficiency}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(player)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {deleteConfirm === player.id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(player.id)}
                              >
                                Confirm
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteConfirm(null)}
                                className="h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteConfirm(player.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                {editingPlayer ? 'Edit Player' : 'Add New Player'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Team *</Label>
                  <Select
                    value={formData.teamId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, teamId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, position: value as Position }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PG">Point Guard</SelectItem>
                      <SelectItem value="SG">Shooting Guard</SelectItem>
                      <SelectItem value="SF">Small Forward</SelectItem>
                      <SelectItem value="PF">Power Forward</SelectItem>
                      <SelectItem value="C">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    type="number"
                    value={formData.number}
                    onChange={(e) => setFormData(prev => ({ ...prev, number: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                    placeholder="e.g., Spain"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-muted-foreground mb-3">Season Statistics</p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ppg">PPG</Label>
                    <Input
                      id="ppg"
                      type="number"
                      step="0.1"
                      value={formData.ppg}
                      onChange={(e) => setFormData(prev => ({ ...prev, ppg: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rpg">RPG</Label>
                    <Input
                      id="rpg"
                      type="number"
                      step="0.1"
                      value={formData.rpg}
                      onChange={(e) => setFormData(prev => ({ ...prev, rpg: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apg">APG</Label>
                    <Input
                      id="apg"
                      type="number"
                      step="0.1"
                      value={formData.apg}
                      onChange={(e) => setFormData(prev => ({ ...prev, apg: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="efficiency">EFF</Label>
                    <Input
                      id="efficiency"
                      type="number"
                      step="0.1"
                      value={formData.efficiency}
                      onChange={(e) => setFormData(prev => ({ ...prev, efficiency: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPlayer ? 'Save Changes' : 'Add Player'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminContent />
    </ProtectedRoute>
  );
}
