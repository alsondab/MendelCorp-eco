'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

export default function TestEmailPage() {
  const [emailData, setEmailData] = useState({
    to: '',
    type: 'test',
    subject: 'Test Email from MendelCorp',
    message: 'Ceci est un email de test pour vérifier que le système d\'emails fonctionne correctement.',
    userName: '',
    htmlContent: '<h1>Mon email HTML personnalisé</h1><p>Contenu personnalisé de test</p>'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
    error?: string
    data?: any
  } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }))
  }

  const sendTestEmail = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmailData({
      to: '',
      type: 'test',
      subject: 'Test Email from MendelCorp',
      message: 'Ceci est un email de test pour vérifier que le système d\'emails fonctionne correctement.',
      userName: '',
      htmlContent: '<h1>Mon email HTML personnalisé</h1><p>Contenu personnalisé de test</p>'
    })
    setResult(null)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">🧪 Test du Système d'Emails</h1>
        <p className="text-center text-gray-600">
          Testez l'envoi d'emails vers n'importe quelle adresse pour vérifier que votre système fonctionne
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle>📧 Configuration de l'Email</CardTitle>
            <CardDescription>
              Configurez et envoyez un email de test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Adresse email */}
            <div className="space-y-2">
              <Label htmlFor="to">Adresse Email de Destination *</Label>
              <Input
                id="to"
                type="email"
                placeholder="test@example.com"
                value={emailData.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                required
              />
            </div>

            {/* Type d'email */}
            <div className="space-y-2">
              <Label htmlFor="type">Type d'Email</Label>
              <Select value={emailData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Email de Test Simple</SelectItem>
                  <SelectItem value="welcome">Email de Bienvenue</SelectItem>
                  <SelectItem value="custom">Email Personnalisé HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Champs conditionnels selon le type */}
            {emailData.type === 'test' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    value={emailData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={emailData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                  />
                </div>
              </>
            )}

            {emailData.type === 'welcome' && (
              <div className="space-y-2">
                <Label htmlFor="userName">Nom d'Utilisateur *</Label>
                <Input
                  id="userName"
                  placeholder="Jean Dupont"
                  value={emailData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  required
                />
              </div>
            )}

            {emailData.type === 'custom' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet *</Label>
                  <Input
                    id="subject"
                    value={emailData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="htmlContent">Contenu HTML *</Label>
                  <Textarea
                    id="htmlContent"
                    value={emailData.htmlContent}
                    onChange={(e) => handleInputChange('htmlContent', e.target.value)}
                    rows={6}
                    placeholder="<h1>Titre</h1><p>Contenu...</p>"
                    required
                  />
                </div>
              </>
            )}

            <Separator />

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <Button 
                onClick={sendTestEmail} 
                disabled={isLoading || !emailData.to}
                className="flex-1"
              >
                {isLoading ? 'Envoi en cours...' : '📤 Envoyer l\'Email'}
              </Button>
              <Button 
                onClick={resetForm} 
                variant="outline"
                disabled={isLoading}
              >
                🔄 Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Résultats</CardTitle>
            <CardDescription>
              Statut de l'envoi et détails de la réponse
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result && (
              <div className="text-center text-gray-500 py-8">
                <p>Envoyez un email pour voir les résultats ici</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Statut */}
                <div className={`p-4 rounded-lg ${
                  result.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${result.success ? '✅' : '❌'}`}></span>
                    <div>
                      <h3 className={`font-semibold ${
                        result.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.success ? 'Succès !' : 'Erreur !'}
                      </h3>
                      <p className={`text-sm ${
                        result.success ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.message || result.error}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Détails techniques */}
                {result.data && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Détails Techniques:</Label>
                    <div className="bg-gray-50 p-3 rounded text-xs font-mono overflow-auto">
                      <pre>{JSON.stringify(result.data, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Instructions:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Vérifiez votre boîte de réception (et spam)</li>
                    <li>• L'email peut prendre quelques minutes à arriver</li>
                    <li>• Vérifiez les logs du serveur pour plus de détails</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informations sur l'API */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>🔧 Informations sur l'API</CardTitle>
          <CardDescription>
            Détails techniques et exemples d'utilisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">📋 Endpoint:</h4>
              <code className="bg-gray-100 px-2 py-1 rounded">POST /api/test-email</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔑 Types d'emails:</h4>
              <ul className="space-y-1">
                <li>• <code>test</code> - Email simple</li>
                <li>• <code>welcome</code> - Email de bienvenue</li>
                <li>• <code>custom</code> - Email HTML personnalisé</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📧 Configuration:</h4>
              <ul className="space-y-1">
                <li>• Service: Resend</li>
                <li>• Expéditeur: {process.env.NEXT_PUBLIC_SENDER_EMAIL || 'onboarding@resend.dev'}</li>
                <li>• Limite: Selon votre plan Resend</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
