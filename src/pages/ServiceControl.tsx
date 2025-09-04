import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  CogIcon, 
  KeyIcon, 
  EyeIcon, 
  EyeSlashIcon,
  WifiIcon,
  BanknotesIcon,
  PhoneIcon,
  TvIcon,
  BoltIcon,
  FireIcon,
  MapIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  active: boolean;
  apiKey?: string;
  provider: string;
  description: string;
}

const initialServices: Service[] = [
  {
    id: 'mobile',
    name: 'Mobile Recharge',
    icon: PhoneIcon,
    active: true,
    apiKey: 'sk_live_****7890',
    provider: 'Airtel API',
    description: 'Prepaid mobile recharge services'
  },
  {
    id: 'dth',
    name: 'DTH Recharge',
    icon: TvIcon,
    active: true,
    apiKey: 'sk_live_****5432',
    provider: 'Dish TV API',
    description: 'Direct-to-Home television recharge'
  },
  {
    id: 'electricity',
    name: 'Electricity Bill',
    icon: BoltIcon,
    active: false,
    provider: 'State Electricity Board',
    description: 'Electricity bill payment services'
  },
  {
    id: 'gas',
    name: 'LPG Booking',
    icon: FireIcon,
    active: true,
    apiKey: 'sk_live_****9876',
    provider: 'Indian Oil API',
    description: 'LPG gas cylinder booking'
  },
  {
    id: 'travel',
    name: 'Travel Booking',
    icon: MapIcon,
    active: false,
    provider: 'Travel Partner API',
    description: 'Bus and flight booking services'
  }
];

export const ServiceControl = () => {
  const [services, setServices] = useState(initialServices);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');

  const toggleService = (serviceId: string) => {
    setServices(services.map(service =>
      service.id === serviceId 
        ? { ...service, active: !service.active }
        : service
    ));
  };

  const startEditingApiKey = (serviceId: string, currentKey: string = '') => {
    setEditingService(serviceId);
    setApiKeyInput(currentKey);
  };

  const saveApiKey = () => {
    if (editingService && apiKeyInput.trim()) {
      setServices(services.map(service =>
        service.id === editingService 
          ? { ...service, apiKey: apiKeyInput.trim() }
          : service
      ));
      setEditingService(null);
      setApiKeyInput('');
    }
  };

  const cancelEditing = () => {
    setEditingService(null);
    setApiKeyInput('');
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '****' + key.substring(key.length - 4);
  };

  return (
    <AdminLayout title="Service Control">
      <div className="p-6">
        <div className="admin-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <CogIcon className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Service Management</h2>
                <p className="text-muted-foreground mt-1">
                  Activate/deactivate services and configure API keys
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="border border-border rounded-lg p-6">
                    {/* Service Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          service.active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleService(service.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          service.active ? 'bg-success' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            service.active ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Provider:</span>
                        <span className="font-medium">{service.provider}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`font-medium ${
                          service.active ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          {service.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      {/* API Key Configuration */}
                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <KeyIcon className="h-4 w-4" />
                            API Key
                          </span>
                          {service.apiKey && (
                            <button
                              onClick={() => setShowApiKey(
                                showApiKey === service.id ? null : service.id
                              )}
                              className="p-1 text-muted-foreground hover:text-foreground"
                            >
                              {showApiKey === service.id ? (
                                <EyeSlashIcon className="h-4 w-4" />
                              ) : (
                                <EyeIcon className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {editingService === service.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={apiKeyInput}
                              onChange={(e) => setApiKeyInput(e.target.value)}
                              placeholder="Enter API key..."
                              className="w-full p-2 text-sm border border-border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={saveApiKey}
                                disabled={!apiKeyInput.trim()}
                                className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="btn-secondary text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {service.apiKey ? (
                              <>
                                <code className="flex-1 text-sm bg-muted p-2 rounded font-mono">
                                  {showApiKey === service.id ? service.apiKey : maskApiKey(service.apiKey)}
                                </code>
                                <button
                                  onClick={() => startEditingApiKey(service.id, service.apiKey)}
                                  className="btn-secondary text-sm"
                                >
                                  Edit
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => startEditingApiKey(service.id)}
                                className="btn-primary text-sm"
                                disabled={!service.active}
                              >
                                Configure API Key
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Status Summary */}
          <div className="p-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Service Status Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {services.filter(s => s.active).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  {services.filter(s => !s.active).length}
                </div>
                <div className="text-sm text-muted-foreground">Inactive Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {services.filter(s => s.apiKey).length}
                </div>
                <div className="text-sm text-muted-foreground">Configured APIs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {services.filter(s => s.active && !s.apiKey).length}
                </div>
                <div className="text-sm text-muted-foreground">Need Configuration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};