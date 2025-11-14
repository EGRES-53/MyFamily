import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Users, Calendar, Image, BookOpen, Database, Activity, TrendingUp, Clock } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  totalMedia: number;
  totalStories: number;
  storageUsed: number;
  recentActivity: {
    newUsersToday: number;
    newEventsToday: number;
    newMediaToday: number;
  };
  userEngagement: {
    activeUsers: number;
    avgEventsPerUser: number;
    avgMediaPerUser: number;
  };
}

const AdminStatsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchAdminStats();
  }, [currentUser, navigate]);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const [
        usersResult,
        eventsResult,
        mediaResult,
        storiesResult,
        newUsersResult,
        newEventsResult,
        newMediaResult,
        activeUsersResult
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id, user_id', { count: 'exact' }),
        supabase.from('media').select('id, file_size', { count: 'exact' }),
        supabase.from('stories').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', todayISO),
        supabase.from('events').select('id', { count: 'exact', head: true }).gte('created_at', todayISO),
        supabase.from('media').select('id', { count: 'exact', head: true }).gte('created_at', todayISO),
        supabase.from('events').select('user_id').gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      const totalUsers = usersResult.count || 0;
      const totalEvents = eventsResult.count || 0;
      const totalMedia = mediaResult.count || 0;
      const totalStories = storiesResult.count || 0;

      const storageUsed = mediaResult.data?.reduce((sum, media) => sum + (media.file_size || 0), 0) || 0;

      const uniqueActiveUsers = new Set(activeUsersResult.data?.map(e => e.user_id) || []).size;

      const avgEventsPerUser = totalUsers > 0 ? totalEvents / totalUsers : 0;
      const avgMediaPerUser = totalUsers > 0 ? totalMedia / totalUsers : 0;

      setStats({
        totalUsers,
        totalEvents,
        totalMedia,
        totalStories,
        storageUsed,
        recentActivity: {
          newUsersToday: newUsersResult.count || 0,
          newEventsToday: newEventsResult.count || 0,
          newMediaToday: newMediaResult.count || 0
        },
        userEngagement: {
          activeUsers: uniqueActiveUsers,
          avgEventsPerUser: Math.round(avgEventsPerUser * 10) / 10,
          avgMediaPerUser: Math.round(avgMediaPerUser * 10) / 10
        }
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center">
        <p className="text-neutral-600">Impossible de charger les statistiques</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-primary-800 mb-2">
            Statistiques Administrateur
          </h1>
          <p className="text-neutral-600">
            Vue d'ensemble des performances et de l'utilisation de l'application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Utilisateurs
              </span>
            </div>
            <div className="text-3xl font-bold text-neutral-800 mb-1">
              {stats.totalUsers}
            </div>
            <p className="text-sm text-neutral-600">
              Comptes créés
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-primary-600" />
              <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                Événements
              </span>
            </div>
            <div className="text-3xl font-bold text-neutral-800 mb-1">
              {stats.totalEvents}
            </div>
            <p className="text-sm text-neutral-600">
              Total créés
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
            <div className="flex items-center justify-between mb-4">
              <Image className="h-8 w-8 text-green-600" />
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Médias
              </span>
            </div>
            <div className="text-3xl font-bold text-neutral-800 mb-1">
              {stats.totalMedia}
            </div>
            <p className="text-sm text-neutral-600">
              Photos et documents
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-amber-600" />
              <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Récits
              </span>
            </div>
            <div className="text-3xl font-bold text-neutral-800 mb-1">
              {stats.totalStories}
            </div>
            <p className="text-sm text-neutral-600">
              Histoires partagées
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
            <div className="flex items-center mb-6">
              <Activity className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-bold font-serif text-primary-800">
                Activité Récente (Aujourd'hui)
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-neutral-700">Nouveaux utilisateurs</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {stats.recentActivity.newUsersToday}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Nouveaux événements</span>
                </div>
                <span className="text-2xl font-bold text-primary-600">
                  {stats.recentActivity.newEventsToday}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Image className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">Nouveaux médias</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {stats.recentActivity.newMediaToday}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-bold font-serif text-primary-800">
                Engagement Utilisateur
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Utilisateurs actifs (30j)</span>
                </div>
                <span className="text-2xl font-bold text-primary-600">
                  {stats.userEngagement.activeUsers}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-neutral-700">Événements / utilisateur</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {stats.userEngagement.avgEventsPerUser}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Image className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">Médias / utilisateur</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {stats.userEngagement.avgMediaPerUser}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-vintage p-6 border border-primary-100">
          <div className="flex items-center mb-6">
            <Database className="h-6 w-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-bold font-serif text-primary-800">
              Stockage
            </h2>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Espace utilisé</p>
              <p className="text-3xl font-bold text-neutral-800">
                {formatBytes(stats.storageUsed)}
              </p>
            </div>
            <Database className="h-12 w-12 text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPage;
