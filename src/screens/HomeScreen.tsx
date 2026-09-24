import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const tasks = [
  {
    id: 1,
    title: 'Complete React Native UI',
    category: 'Development',
    time: '10:00 AM',
    priority: 'High',
    completed: true,
  },
  {
    id: 2,
    title: 'Review project requirements',
    category: 'Work',
    time: '12:30 PM',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Learn Supabase Realtime',
    category: 'Learning',
    time: '04:00 PM',
    priority: 'High',
    completed: false,
  },
  {
    id: 4,
    title: 'Update GitHub repository',
    category: 'Development',
    time: '06:30 PM',
    priority: 'Low',
    completed: false,
  },
];

function HomeScreen() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallGreeting}>Good morning 👋</Text>
            <Text style={styles.userName}>Usama</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Date */}
        <Text style={styles.dateText}>Thursday, September 24</Text>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressLabel}>Today's Progress</Text>

              <Text style={styles.progressTitle}>
                Keep going, you're doing great!
              </Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>{progress}%</Text>
            </View>
          </View>

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBar,
                {width: `${progress}%`},
              ]}
            />
          </View>

          <Text style={styles.progressFooter}>
            {completedTasks} of {tasks.length} tasks completed
          </Text>
        </View>

        {/* Statistics */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>✓</Text>
            </View>

            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>○</Text>
            </View>

            <Text style={styles.statNumber}>08</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>!</Text>
            </View>

            <Text style={styles.statNumber}>03</Text>
            <Text style={styles.statLabel}>Priority</Text>
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.tasksHeader}>
          <View>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <Text style={styles.taskSubtitle}>
              Stay focused and productive
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <View style={styles.taskList}>
          {tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.8}
              style={styles.taskCard}>
              
              <View
                style={[
                  styles.checkBox,
                  task.completed && styles.checkBoxCompleted,
                ]}>
                {task.completed && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </View>

              <View style={styles.taskContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedTaskTitle,
                  ]}>
                  {task.title}
                </Text>

                <View style={styles.taskMeta}>
                  <Text style={styles.taskCategory}>
                    {task.category}
                  </Text>

                  <View style={styles.metaDot} />

                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.priorityBadge,
                  task.priority === 'High' && styles.highPriority,
                  task.priority === 'Medium' && styles.mediumPriority,
                  task.priority === 'Low' && styles.lowPriority,
                ]}>
                <Text style={styles.priorityText}>
                  {task.priority}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Productivity Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Text style={styles.tipIcon}>💡</Text>
          </View>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Productivity tip</Text>

            <Text style={styles.tipText}>
              Focus on one important task at a time. Small progress
              every day creates big results.
            </Text>
          </View>
        </View>

        {/* Bottom spacing for FAB */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.activeNavIcon}>⌂</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>✓</Text>
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>

        <View style={styles.navSpace} />

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>▣</Text>
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>●</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 110,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallGreeting: {
    fontSize: 14,
    color: '#7A7F8C',
    marginBottom: 3,
  },

  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171A21',
  },

  dateText: {
    fontSize: 13,
    color: '#8A8F9C',
    marginTop: 6,
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  notificationIcon: {
    fontSize: 20,
  },

  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#FF5A5F',
  },

  /* Progress */

  progressCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 22,
    backgroundColor: '#171A21',
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressLabel: {
    fontSize: 13,
    color: '#AEB3BF',
    marginBottom: 7,
  },

  progressTitle: {
    width: 210,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  progressCircle: {
    width: 58,
    height: 58,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  progressBarBackground: {
    height: 7,
    borderRadius: 10,
    backgroundColor: '#363A43',
    marginTop: 22,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  progressFooter: {
    fontSize: 12,
    color: '#AEB3BF',
    marginTop: 9,
  },

  /* Sections */

  sectionHeader: {
    marginTop: 27,
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171A21',
  },

  /* Statistics */

  statsContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F0F1F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  statIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171A21',
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171A21',
  },

  statLabel: {
    fontSize: 11,
    color: '#8A8F9C',
    marginTop: 3,
  },

  /* Tasks */

  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 28,
    marginBottom: 14,
  },

  taskSubtitle: {
    fontSize: 12,
    color: '#9297A3',
    marginTop: 4,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171A21',
  },

  taskList: {
    gap: 10,
  },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    elevation: 1,
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  checkBox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#D8DAE0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkBoxCompleted: {
    backgroundColor: '#171A21',
    borderColor: '#171A21',
  },

  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  taskContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20232B',
  },

  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: '#9A9EA8',
  },

  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  taskCategory: {
    fontSize: 11,
    color: '#888D98',
  },

  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#B9BCC4',
    marginHorizontal: 7,
  },

  taskTime: {
    fontSize: 11,
    color: '#888D98',
  },

  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  highPriority: {
    backgroundColor: '#FDEBEC',
  },

  mediumPriority: {
    backgroundColor: '#FFF4DC',
  },

  lowPriority: {
    backgroundColor: '#EAF6EF',
  },

  priorityText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#555A65',
  },

  /* Tip */

  tipCard: {
    flexDirection: 'row',
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },

  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F4F4F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tipIcon: {
    fontSize: 20,
  },

  tipContent: {
    flex: 1,
    marginLeft: 12,
  },

  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#20232B',
    marginBottom: 4,
  },

  tipText: {
    fontSize: 11,
    lineHeight: 17,
    color: '#858A96',
  },

  bottomSpacing: {
    height: 30,
  },

  /* Floating button */

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 78,
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#171A21',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  fabText: {
    fontSize: 30,
    lineHeight: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },

  /* Bottom Navigation */

  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 67,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEF1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },

  navItem: {
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 18,
    color: '#9296A0',
    marginBottom: 3,
  },

  activeNavIcon: {
    fontSize: 19,
    color: '#171A21',
    marginBottom: 3,
  },

  navText: {
    fontSize: 9,
    color: '#9296A0',
  },

  activeNavText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#171A21',
  },

  navSpace: {
    width: 55,
  },
});

export default HomeScreen;