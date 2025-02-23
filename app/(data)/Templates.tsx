export default [
    {
        name: 'Lesson Plan Generator',
        desc: 'Create detailed, standards-aligned lesson plans with learning objectives, activities, and assessments.',
        category: 'Teaching',
        icon: '/icons/lesson-plan.svg',
        emoji: '📚',
        aiprompt: `Create a comprehensive lesson plan that includes:
            - Clear learning objectives
            - Engaging activities and materials
            - Assessment strategies
            - Differentiation approaches
            - Time management breakdown
            Focus on active learning and student engagement.`,
        slug: 'generate-lesson-plan',
        form: [
            {
                label: 'Subject and Grade Level',
                field: 'input',
                name: 'subject_grade',
                required: true
            },
            {
                label: 'Learning Objectives',
                field: 'textarea',
                name: 'objectives',
                required: true
            },
            {
                label: 'Class Duration',
                field: 'input',
                name: 'duration',
                required: true
            }
        ]
    },
    {
        name: 'Assessment Creator',
        desc: 'Design effective assessments with rubrics, question banks, and grading criteria.',
        category: 'Assessment',
        icon: '/icons/assessment.svg',
        emoji: '📝',
        aiprompt: 'Generate a comprehensive assessment including various question types, rubrics, and marking schemes aligned with learning objectives.',
        slug: 'create-assessment',
        form: [
            {
                label: 'Topic and Learning Outcomes',
                field: 'textarea',
                name: 'outcomes',
                required: true
            },
            {
                label: 'Assessment Type (Quiz/Test/Project)',
                field: 'input',
                name: 'type',
                required: true
            }
        ]
    },
    {
        name: 'Student Feedback Generator',
        desc: 'Create constructive, personalized feedback for student assignments and performances.',
        category: 'Feedback',
        icon: '/icons/feedback.svg',
        emoji: '💭',
        aiprompt: 'Generate detailed, constructive feedback that highlights strengths, areas for improvement, and specific suggestions for growth.',
        slug: 'generate-feedback',
        form: [
            {
                label: 'Student Performance Details',
                field: 'textarea',
                name: 'performance',
                required: true
            },
            {
                label: 'Assignment Type',
                field: 'input',
                name: 'assignment_type',
                required: true
            }
        ]
    },
    {
        name: 'Differentiation Planner',
        desc: 'Create differentiated learning strategies for diverse student needs.',
        category: 'Planning',
        icon: '/icons/differentiation.svg',
        emoji: '🎯',
        aiprompt: 'Develop differentiated learning strategies and materials for various student ability levels and learning styles.',
        slug: 'plan-differentiation',
        form: [
            {
                label: 'Student Learning Profiles',
                field: 'textarea',
                name: 'profiles',
                required: true
            },
            {
                label: 'Learning Objectives',
                field: 'textarea',
                name: 'objectives',
                required: true
            }
        ]
    },
    {
        name: 'Parent Communication Template',
        desc: 'Generate professional and clear parent communication templates.',
        category: 'Communication',
        icon: '/icons/communication.svg',
        emoji: '✉️',
        aiprompt: 'Create professional, clear, and empathetic communication templates for various parent interaction scenarios.',
        slug: 'parent-communication',
        form: [
            {
                label: 'Communication Purpose',
                field: 'input',
                name: 'purpose',
                required: true
            },
            {
                label: 'Key Points to Address',
                field: 'textarea',
                name: 'key_points',
                required: true
            }
        ]
    },
    {
        name: 'Activity Designer',
        desc: 'Create engaging classroom activities and interactive exercises.',
        category: 'Activities',
        icon: '/icons/activity.svg',
        emoji: '🎮',
        aiprompt: 'Design interactive and engaging learning activities that promote active participation and deep understanding.',
        slug: 'design-activity',
        form: [
            {
                label: 'Learning Objective',
                field: 'textarea',
                name: 'objective',
                required: true
            },
            {
                label: 'Student Age Group',
                field: 'input',
                name: 'age_group',
                required: true
            }
        ]
    },
    {
        name: 'IEP Goal Writer',
        desc: 'Generate individualized education program goals and objectives.',
        category: 'Special Education',
        icon: '/icons/iep.svg',
        emoji: '🎯',
        aiprompt: 'Create specific, measurable IEP goals and objectives based on student needs and capabilities.',
        slug: 'write-iep-goals',
        form: [
            {
                label: 'Student Needs and Present Levels',
                field: 'textarea',
                name: 'present_levels',
                required: true
            },
            {
                label: 'Target Skills',
                field: 'textarea',
                name: 'target_skills',
                required: true
            }
        ]
    },
    {
        name: 'Behavior Management Plan',
        desc: 'Create comprehensive behavior management strategies and interventions.',
        category: 'Classroom Management',
        icon: '/icons/behavior.svg',
        emoji: '🌟',
        aiprompt: 'Develop effective behavior management strategies with positive reinforcement and intervention techniques.',
        slug: 'behavior-plan',
        form: [
            {
                label: 'Behavior Concerns',
                field: 'textarea',
                name: 'concerns',
                required: true
            },
            {
                label: 'Class Environment',
                field: 'input',
                name: 'environment',
                required: true
            }
        ]
    },
    {
        name: 'Project-Based Learning Designer',
        desc: 'Design engaging project-based learning experiences.',
        category: 'Project Learning',
        icon: '/icons/project.svg',
        emoji: '🚀',
        aiprompt: 'Create comprehensive project-based learning units with authentic tasks, rubrics, and timeline.',
        slug: 'design-pbl',
        form: [
            {
                label: 'Project Theme/Topic',
                field: 'input',
                name: 'theme',
                required: true
            },
            {
                label: 'Learning Goals and Standards',
                field: 'textarea',
                name: 'goals',
                required: true
            }
        ]
    }
]
