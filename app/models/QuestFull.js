var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        quest_id: {
            type: String
        },
        language: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        cover: {
            type: String
        },
        hero: {
            attributes: {
                health: {
                        type: Number
                },
                strength: {
                    type: Number
                },
                agility: {
                    type: Number
                },
                intelligence: {
                    type: Number
                }
            },
            items: [
                {
                    item_id: {
                        type: String
                    },
                    quantity:{
                        type: Number
                    }
                }
            ]
        },
        items: [{
            item_id: {
                type: String
            },
            type: {
                type: String
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            events: [{
                event_id: {
                    type: String
                },
                type: {
                    type: String
                },
                text: {
                    type: String
                },
                attribute: {
                    type: String
                },
                value: {
                    type: Number
                },
                item_id: {
                    type: String
                },
                quantity: {
                    type: Number
                },
                scene_id: {
                    type: String
                }
            }]
        }],
        scenes: [{
            scene_id: {
                type: String
            },
            type: {
                type: String
            },
            title: {
                type: String
            },
            text: {
                type: String
            },
            actions: [{
                action_id:{
                    type: String
                },
                text: {
                    type: String
                },
                require_items: [{
                    item_id: {
                        type: String
                    },
                    quantity: {
                        type: Number
                    }
                }],
                require_attribute_value: {
                    health: {
                        type: Number
                    },
                    strength: {
                        type: Number
                    },
                    agility: {
                        type: Number
                    },
                    intelligence: {
                        type: Number
                    }
                },
                events: [{
                    event_id:{
                        type: String
                    },
                    type: {
                        type: String
                    },
                    text: {
                        type: String
                    },
                    attribute: {
                        type: String
                    },
                    value: {
                        type: Number
                    },
                    item_id: {
                        type: String
                    },
                    quantity: {
                        type: Number
                    },
                    scene_id: {
                        type: String
                    }
                }]
            }]
        }]
    });

    return mongoose.model('QuestFull', schema);
};