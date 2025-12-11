import AnthropicProvider from './providers/anthropic';
import DeepseekProvider from './providers/deepseek';
import GithubProvider from './providers/github';
import GoogleProvider from './providers/google';
import GroqProvider from './providers/groq';
import HuggingFaceProvider from './providers/huggingface';
import HyperbolicProvider from './providers/hyperbolic';
import LMStudioProvider from './providers/lmstudio';
import MistralProvider from './providers/mistral';
import MoonshotProvider from './providers/moonshot';
import OllamaProvider from './providers/ollama';
import OpenAIProvider from './providers/openai';
import OpenAILikeProvider from './providers/openai-like';
import OpenRouterProvider from './providers/open-router';
import PerplexityProvider from './providers/perplexity';
import TogetherProvider from './providers/together';
import XAIProvider from './providers/xai';
// import ZAIProvider from './providers/zai';
// import ZeroOneProvider from './providers/01';

export const PROVIDER_LIST = [
  new OpenAIProvider(),
  new AnthropicProvider(),
  new GoogleProvider(),
  new GroqProvider(),
  new HuggingFaceProvider(),
  new MistralProvider(),
  new MoonshotProvider(),
  new OllamaProvider(),
  new OpenRouterProvider(),
  new PerplexityProvider(),
  new TogetherProvider(),
  new XAIProvider(),
  // new ZAIProvider(),
  // new ZeroOneProvider(),
  new DeepseekProvider(),
  new HyperbolicProvider(),
  new GithubProvider(),
  new LMStudioProvider(),
  new OpenAILikeProvider(),
];

export const DEFAULT_PROVIDER = new OpenAILikeProvider();
