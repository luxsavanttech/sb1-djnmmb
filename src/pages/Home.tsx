import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Activity, Calendar, HeartPulse, Search, Video } from 'lucide-react';
import { HealthMetricsChart } from '../components/HealthMetricsChart';

export function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Search,
      title: t('findDoctor'),
      description: 'Connect with qualified healthcare providers worldwide',
      link: '/doctors',
    },
    {
      icon: Video,
      title: 'Virtual Consultations',
      description: 'Secure video consultations from anywhere',
      link: '/appointments',
    },
    {
      icon: Activity,
      title: t('symptoms'),
      description: 'AI-powered symptom analysis and recommendations',
      link: '/symptoms',
    },
    {
      icon: Calendar,
      title: t('appointments'),
      description: 'Schedule and manage your appointments',
      link: '/appointments',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {t('welcome')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('tagline')}
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/doctors"
            className="btn btn-primary px-6 py-3"
          >
            {t('findDoctor')}
          </Link>
          <Link
            to="/emergency"
            className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-3"
          >
            {t('emergency')}
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Health Metrics Dashboard */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <HeartPulse className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Health Metrics</span>
          </h2>
        </div>
        <HealthMetricsChart />
      </section>
    </div>
  );
}