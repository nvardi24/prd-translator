import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, Badge } from '../ui';

export const SecurityNotice = ({ securityStatus, onShowDetails }) => {
  if (!securityStatus) return null;

  const isSecure = securityStatus.isSecure;

  return (
    <Card className={`border-2 ${isSecure ? 'border-green-200 dark:border-green-800' : 'border-amber-200 dark:border-amber-800'}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {isSecure ? (
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Security Status
              </h4>
              <Badge variant={isSecure ? 'success' : 'warning'}>
                {isSecure ? 'Secure' : 'Warning'}
              </Badge>
            </div>

            {isSecure ? (
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  <span>Secure environment detected</span>
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  • API keys stored in sessionStorage (cleared on tab close)
                  <br />
                  • Keys automatically expire after 2 hours
                  <br />
                  • Basic encryption applied to stored data
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  Security concerns detected:
                </div>
                <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                  {securityStatus.issues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={onShowDetails}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-1"
              >
                <Info className="w-3 h-3" />
                <span>View security details</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 