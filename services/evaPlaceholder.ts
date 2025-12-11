/**
 * Eva Placeholder Intelligence Layer
 *
 * A deterministic, controlled simulation of Eva's AI intelligence.
 * This module provides templated responses for testing the UI/UX
 * before connecting real LLM endpoints.
 *
 * Design principles:
 * - Deterministic output (no randomness beyond seeded selection)
 * - Consistent anime-adjacent emotional voice
 * - Personalized using onboarding values
 * - Short, calm, reflective responses
 */

// ============================================================
// INTERFACES
// ============================================================

export interface ReflectionContext {
  arcTitle: string;
  boss: string;
  finalForm: string;
  mood: string;
}

export interface EvaMessage {
  role: 'eva';
  text: string;
}

export interface MeditationParams {
  arcTitle: string;
  boss: string;
  finalForm: string;
  mood: string;
}

// ============================================================
// REFLECTION RESPONSE TEMPLATES
// ============================================================

/**
 * Eva's voice templates for reflection chat.
 * Each template follows the structure:
 * 1. Acknowledge the user's message
 * 2. Tie it to their journey (arc, boss, or mood)
 * 3. Offer a guiding question or insight
 */
const REFLECTION_TEMPLATES: string[] = [
  // Template 0 - Arc-focused, gentle acknowledgment
  `Thank you for sharing that. I can sense a lot behind those words.
Within your arc "{arcTitle}", moments like this are important.
When you think about {boss} — what part of this feels the heaviest right now?`,

  // Template 1 - Mood-connected, validation-first
  `I hear you. Feeling {mood} while carrying this makes sense.
Your journey toward {finalForm} isn't always a straight line.
What would it feel like to release just 1% of this weight?`,

  // Template 2 - Boss-focused, encouraging
  `That sounds like {boss} showing up in a familiar way.
It's okay — recognizing it is already progress.
In your arc "{arcTitle}", what small truth does this reveal about you?`,

  // Template 3 - FinalForm aspiration, reflective
  `You're being honest with yourself, and that matters.
The version of you that is {finalForm} — they've walked through moments like this too.
What would they tell you right now?`,

  // Template 4 - Mood-based validation, open question
  `When you feel {mood}, it's a signal — not a sentence.
Your arc "{arcTitle}" holds space for all of this.
What's one thing underneath this feeling that wants to be seen?`,

  // Template 5 - Short and grounding
  `That's real. Thank you for not hiding it.
{boss} may feel heavy, but you're not carrying it alone.
What would feel like a tiny step forward from here?`,

  // Template 6 - Emotional depth, arc connection
  `I sense something deeper here. Your words carry weight.
Within "{arcTitle}", this is part of your story — not the end of it.
If {boss} could speak, what would it be asking of you?`,
];

/**
 * Initial Eva messages for starting a reflection session.
 * These set the tone and invite the user to share.
 */
const INITIAL_REFLECTION_MESSAGES: string[] = [
  `I noticed how you checked in today. {mood} is a valid place to be.`,
  `What's one thing that's been weighing on you lately?`,
];

// ============================================================
// MEDITATION TEMPLATES
// ============================================================

/**
 * Zen Quest meditation scripts.
 * Each template:
 * - 6-10 lines of paced, readable text
 * - Includes breathing cues
 * - References onboarding values naturally
 * - Subtle anime flavor while staying emotionally grounded
 */
const MEDITATION_TEMPLATES: string[] = [
  // Template 0 - Classic breathing focus
  `Close your eyes.
Inhale slowly… exhale gently.
Today's mood: {mood}. Let it rise and fall like a passing cloud.
Your arc, "{arcTitle}", continues to unfold.
With each breath, release one thread of {boss}.
You don't have to solve it — just loosen your grip.
Step toward your {finalForm}.
You are moving with intention.
One percent at a time.`,

  // Template 1 - Visualization journey
  `Take a slow breath in… and let it go.
Picture yourself walking a quiet path.
The weight of {boss} is a stone in your pocket.
You don't have to throw it away — just set it down for a moment.
In your arc "{arcTitle}", you are allowed to rest.
Your {finalForm} self is waiting, patient and kind.
Breathe in possibility. Breathe out tension.
You are exactly where you need to be.`,

  // Template 2 - Body-centered release
  `Settle into stillness.
Notice where {mood} lives in your body right now.
Breathe into that space… and soften.
Your arc, "{arcTitle}", holds all of this.
{boss} may feel heavy, but you are not defined by its weight.
With each exhale, imagine 1% dissolving.
Your {finalForm} grows clearer with every breath.
You are becoming.`,

  // Template 3 - Anime-inspired determination
  `Close your eyes, warrior.
Your arc — "{arcTitle}" — is not over. It's unfolding.
{boss} is not your enemy. It's your teacher.
Breathe in the lesson. Breathe out the struggle.
Feeling {mood} is part of the journey, not a detour.
Your {finalForm} awaits on the other side of this moment.
One breath. One step. One choice.
You've got this.`,
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Simple deterministic hash based on string content.
 * Used to select template variations in a consistent way.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Interpolate template variables with context values.
 * Replaces {arcTitle}, {boss}, {finalForm}, {mood} with actual values.
 */
function interpolateTemplate(template: string, context: ReflectionContext | MeditationParams): string {
  return template
    .replace(/\{arcTitle\}/g, context.arcTitle || 'Your Journey')
    .replace(/\{boss\}/g, context.boss || 'your challenge')
    .replace(/\{finalForm\}/g, context.finalForm || 'your true self')
    .replace(/\{mood\}/g, context.mood || 'present');
}

/**
 * Capitalize first letter of mood for display.
 */
function formatMood(mood: string): string {
  if (!mood) return 'present';
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
}

// ============================================================
// EXPORTED FUNCTIONS
// ============================================================

/**
 * Generate Eva's initial messages for starting a reflection session.
 * Returns an array of EvaMessage objects to display at the start.
 */
export function generateInitialReflectionMessages(context: ReflectionContext): EvaMessage[] {
  const formattedContext = {
    ...context,
    mood: formatMood(context.mood),
  };

  return INITIAL_REFLECTION_MESSAGES.map((template, index) => ({
    role: 'eva' as const,
    text: interpolateTemplate(template, formattedContext),
  }));
}

/**
 * Generate Eva's response to a user message during reflection.
 *
 * Selection logic:
 * - Uses message length + content hash to select template
 * - Ensures deterministic but varied responses
 * - Short messages (< 20 chars) get encouraging templates
 * - Longer messages get deeper, more reflective templates
 *
 * @param userMessage - The user's input message
 * @param context - Onboarding values and current mood
 * @returns EvaMessage with role and generated text
 */
export function generateEvaReflectionResponse(
  userMessage: string,
  context: ReflectionContext
): EvaMessage {
  // Skip empty messages
  if (!userMessage.trim()) {
    return {
      role: 'eva',
      text: "I'm here when you're ready to share.",
    };
  }

  // Determine template selection based on message characteristics
  const messageLength = userMessage.length;
  const messageHash = simpleHash(userMessage);

  // Combine factors for template selection
  // Short messages -> templates 4, 5 (shorter, more open)
  // Medium messages -> templates 0, 1, 2 (balanced)
  // Long messages -> templates 3, 6 (deeper reflection)
  let templateIndex: number;

  if (messageLength < 30) {
    // Short messages: use templates 4 or 5
    templateIndex = 4 + (messageHash % 2);
  } else if (messageLength < 100) {
    // Medium messages: use templates 0, 1, or 2
    templateIndex = messageHash % 3;
  } else {
    // Long messages: use templates 3 or 6
    templateIndex = messageHash % 2 === 0 ? 3 : 6;
  }

  const template = REFLECTION_TEMPLATES[templateIndex];
  const formattedContext = {
    ...context,
    mood: formatMood(context.mood),
  };

  return {
    role: 'eva',
    text: interpolateTemplate(template, formattedContext),
  };
}

/**
 * Generate a personalized Zen Quest meditation script.
 *
 * Selection logic:
 * - Uses arcTitle length as seed for deterministic selection
 * - Ensures same user gets consistent meditation style
 *
 * @param params - Onboarding values and current mood
 * @returns Formatted meditation script string
 */
export function generateZenQuestMeditation(params: MeditationParams): string {
  // Select template based on arcTitle characteristics
  const seed = params.arcTitle?.length || 0;
  const templateIndex = seed % MEDITATION_TEMPLATES.length;

  const template = MEDITATION_TEMPLATES[templateIndex];
  const formattedParams = {
    ...params,
    mood: formatMood(params.mood),
  };

  return interpolateTemplate(template, formattedParams);
}

/**
 * Parse meditation script into array of lines for display.
 * Useful if you want to render each line separately with animations.
 */
export function parseMeditationLines(meditationScript: string): string[] {
  return meditationScript
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
