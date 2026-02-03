/**
 * API Client para el backend de generación de CV
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface StartConversationResponse {
  conversation_id: string;
  message: string;
  step: string;
  step_number?: number;
  total_steps?: number;
  suggestions?: string[];
  validation?: {
    min_length?: number;
    max_length?: number;
    format?: string;
    example?: string;
  };
}

export interface AnswerResponse {
  finished: boolean;
  message: string;
  step?: string;
  step_number?: number;
  total_steps?: number;
  suggestions?: string[];
  validation?: {
    min_length?: number;
    max_length?: number;
    format?: string;
    example?: string;
  };
  cv?: {
    nombre: string;
    perfil: string;
    experiencia: string;
    educacion: string;
    habilidades: string;
  };
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Inicia una nueva conversación de CV
 */
export async function startConversation(): Promise<StartConversationResponse> {
  try {
    const response = await fetch(`${API_URL}/cv/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Error al iniciar conversación');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en startConversation:', error);
    throw error;
  }
}

/**
 * Envía una respuesta a la conversación
 */
export async function sendAnswer(
  conversationId: string,
  answer: string
): Promise<AnswerResponse> {
  try {
    const response = await fetch(`${API_URL}/cv/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        answer: answer,
      }),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Error al procesar respuesta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en sendAnswer:', error);
    throw error;
  }
}
