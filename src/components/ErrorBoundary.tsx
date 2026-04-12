import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Beklenmedik bir hata oluştu.";
      let isPermissionError = false;

      try {
        const errorData = JSON.parse(this.state.error?.message || '{}');
        if (errorData.error && errorData.error.includes('insufficient permissions')) {
          errorMessage = "Bu işlemi yapmak için yetkiniz bulunmuyor. Lütfen doğru hesapla giriş yaptığınızdan emin olun.";
          isPermissionError = true;
        } else if (errorData.error && errorData.error.includes('quota exceeded')) {
          errorMessage = "Günlük veri limitine ulaşıldı. Lütfen daha sonra tekrar deneyin veya planınızı kontrol edin.";
        } else if (this.state.error?.message) {
          errorMessage = this.state.error.message;
        }
      } catch {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Bir Sorun Oluştu</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-orange transition-all flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> Sayfayı Yenile
              </button>
              {isPermissionError && (
                <p className="text-xs text-gray-400">
                  Not: darkwal3@gmail.com adresi dışındaki hesaplar düzenleme yapamaz.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
